import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const livroEncontrado = await livro.findById(req.params.id);
            if (!livroEncontrado) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            if (!autorEncontrado) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!livroAtualizado) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
            res.status(200).json({ message: "Livro atualizado com sucesso", livro: livroAtualizado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
    }

    static async excluirLivro(req, res) {
        try {
            const livroExcluido = await livro.findByIdAndDelete(req.params.id);
            if (!livroExcluido) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
            res.status(200).json({ message: "Livro excluído com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }
    }

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }

}

export default LivroController;
