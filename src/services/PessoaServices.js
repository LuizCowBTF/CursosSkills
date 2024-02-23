const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async pegaMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatricula(estudanteId) {
    await super.atualizaRegistro({ ativo: false}, {id: estudanteId});
    await this.matriculaServices.atualizaRegistro({ status: 'cancelado'}, {estudante_id: estudanteId});
  }
}

module.exports = PessoaServices;
