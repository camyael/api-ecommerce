import chai from "chai";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest('http://localhost:8080')
let idProduct

describe('Testing sobre el servidor', () => {
    describe('Test de productos', () => {
        it('El endpoint POST en /products incorpora productos al listado', async() => {
            const newproduct = {
                title: 'Producto',
                description: 'xxxxxxxxxx',
                price: 726525
            }
            const result = await requester.post('/products')
            .field('title', newproduct.title)
            .field('description', newproduct.description)
            .field('price', newproduct.price)
            // comento la imagen para que no se siga guardando en public > images
            // .attach('image', './test/prueba.jpg')
            expect(result.status).to.be.eql(200)
            expect(result._body).to.have.property('payload');
            idProduct = result._body.payload._id
        })
        it('El endpoint PUT en /products/:pid actualiza el precio de un producto', async() => {
            const price = '999.99'
            const result = await requester.put(`/products/${idProduct}`).send(price)
            expect(result.status).to.be.eql(200)
        })
        it('El endpoint DELETE en /products/:pid borra un producto', async() => {
            let pid = idProduct
            const result = await requester.delete(`/products/${pid}`)
            .field('pid', pid)
            expect(result.status).to.be.eql(200)
            expect(result._body).to.have.property('payload')
        })
    })
    describe('Test de usuarios', () => {
        it('El endpoint POST en /register crea un usuario y lo guarda en la base de datos', async() => {
            const userTest = {
                first_name: 'Juan',
                last_name: 'Mendoza',
                mail: 'juan@correo.com',
                phoneNumber: 1124367434,
                password: 123,
            }

            const result = await requester.post('/register')
            .field('first_name', userTest.first_name)
            .field('last_name', userTest.last_name)
            .field('mail', userTest.mail)
            .field('phoneNumber', userTest.phoneNumber)
            .field('password', userTest.password)
            .attach('image', './test/prueba.jpg')

            expect(result.status).to.be.equal(200)
            expect(result._body).to.have.property('payload')
        })
        it('El endpoint POST en /login accede a la base de datos, comprueba que exista y accede al usuario', async() => {
            const user = {
                mail: 'juan@correo.com',
                password: '123'
            }

            const result = await requester.post('/login').send(user)
            expect(result.status).to.be.equal(200)
            expect(result._body).to.have.property('payload')
        })
    })
})