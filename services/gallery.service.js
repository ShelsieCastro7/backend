const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class GalleryService {

  constructor() {
    this.gallery = [];
    this.generate();
  }

  generate(){
    const limit = 100; //si no me trae el parametro size entonces por defecto me trae 10 imagenews
    for (let index = 0; index < limit; index++) {
      this.gallery.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10), // aqui como el faker va a traer en numero en string, se pasa a number con el parseInt en base 10
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

   async create(data){
    const newImage = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.gallery.push(newImage);
    return newImage; //retorna la nueva imagen que se creo
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.gallery);
      }, 5000); //simula un delay de 5 segundos para que se vea la carga de
    })
  }

   async findOne(id){
    const image = this.gallery.find(item => item.id === id);
    if (!image) {
      throw boom.notFound('Item not found');
    }
    if (image.isBlock) {
      throw boom.conflict('Item is blocked');
    }
    return image; //retorna la imagen que se busco por id
  }
  async update(id, changes){
    const index = this.gallery.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Item not found');
    }
    const image = this.gallery[index]; //busca el item por el id que se le paso
    this.gallery[index] = {
      ...image,
      ...changes,
    }; //cambia el item por los nuevos cambios que se le pasen
    return this.gallery[index]; //retorna el item actualizado
  }

  async delete(id){
    const index = this.gallery.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Item not found');
    }
    this.gallery.splice(index, 1); //elimina el item que se le pasa por id
    return { id }; //retorna el id del item eliminado
  }

}

module.exports = GalleryService;
