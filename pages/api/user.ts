import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next';
import { corsPolicy } from '../../middlewares/corsPolicy';
import { dbConnect } from '../../middlewares/dbConnect';
import { UserModel } from '../../models/UserModel';
import { DefaultResponse } from '../../types/DefaultResponse';
import { User } from '../../types/User';

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
    try {
        if (req.method !== 'POST')
            return res.status(400).json({ error: "Dados de entrada inválidos." });

        const obj: User = req.body;

        if (!obj.name || obj.name.length < 3 || !obj.name || !obj.password || obj.email.length < 6 || obj.password.length < 4)
            return res.status(400).json({ error: "Dados de entrada inválidos." });

        const usersFound = await UserModel.find({ email: obj.email });
        if (usersFound && usersFound.length > 0) {
            return res.status(400).json({ error: 'Já existe usuario com o email informado.' });
        }

        obj.password = md5(obj.password);

        await UserModel.create(obj)

        return res.status(200).json({ message: "Usuário criado com sucesso." });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Ocorreu erro ao cadastrar usuário." });
    }
}

export default corsPolicy(dbConnect(handler));