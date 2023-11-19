import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(o => o.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет удалось взять все посты '
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет удалось взять все посты '
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                new: true // Чтобы вернуть обновленный документ
            }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Данного поста нет'
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет удалось взять пост'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const removePost = await PostModel.findOneAndRemove(
            {
                _id: postId,
            },
            {
                new: true
            }
        );

        if (!removePost) {
            return res.status(404).json({
                message: 'Данного поста нет'
            });
        }

        res.json({
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалость удалить пост'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обновить пост'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        res.status(500).json({
            message: 'Нет удалось создать пост'
        })
    }
}