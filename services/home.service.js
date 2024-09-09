const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class HomeService {

  constructor() {
    this.home = [];
    this.generate();
  }

  generate(){
    const limit = 7;
    for (let index = 0; index < limit; index++) {
      this.home.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10), // aqui como el faker va a traer en numero en string, se pasa a number con el parseInt en base 10
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newService = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.home.push(newService);
    return newService;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.home);
      }, 5000); //simula un delay de 5 segundos para que se vea la carga de
    })
  }

  async findOne(id){
    const service = this.home.find(item => item.id === id);
    if (!service) {
      throw boom.notFound('Item not found');
    }
    if (service.isBlock) {
      throw boom.conflict('Item is blocked');
    }
    return service;
  }
  async update(id, changes){
    const index = this.home.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Item not found');
    }
    const service = this.home[index]; //busca el item por el id que se le paso
    this.home[index] = {
      ...service,
      ...changes,
    }; //cambia el item por los nuevos cambios que se le pasen
    return this.home[index]; //retorna el item actualizado
  }
  async delete(id){
    const index = this.home.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Item not found');
    }
    this.home.splice(index, 1); //elimina el item que se le pasa por id
    return { id }; //retorna el id del item eliminado
  }

}

module.exports = HomeService;
