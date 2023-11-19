import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен составлять как минимум из 5 символов').isLength({min: 5}),
    body('fullName', 'Имя должно составлять как минимум из 3 символов').optional().isLength({min: 3}).matches(/^[^0-9]*$/, 'g'),
    body('avatarUrl', 'Неверный формат ссылки').optional().isURL()
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен составлять как минимум из 5 символов').isLength({min: 5}),
    body('fullName', 'Имя должно составлять как минимум из 3 символов').isLength({min: 3}).matches(/^[^0-9]*$/, 'g'),
    body('avatarUrl', 'Неверный формат ссылки').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imgUrl', 'Неверная ссылка на изображение').optional().isURL(),
]
