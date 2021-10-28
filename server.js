import Express  from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv  from 'dotenv';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3001;

import Cors from 'cors';

const stringConexion = process.env.ATLAS_URI;

const client = new MongoClient(stringConexion,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

let conexion;

const app = Express();
app.use(Express.json());
app.use(Cors());



// CRUD VENTAS

app.get('/ventas', (req, res)=>{
    console.log('Alguien hizo get en la barra /ventas');
    conexion.collection('venta').find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.status(400).send('error consultando las ventas');
        }else{
            res.json(result);
        }
    });
});

app.post('/ventas/nuevo', (req, res)=>{
    const datosVenta = req.body;
    console.log('llaves: ', Object.keys(datosVenta));
    try{
        if(
            Object.keys(datosVenta).includes('descripcion')&& 
            Object.keys(datosVenta).includes('price_venta')&&
            Object.keys(datosVenta).includes('status_venta')
        ){
            conexion.collection('venta').insertOne(datosVenta, (err, result) => {
                if(err) {
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        
       }
    else{
        
    } 
    }catch{
        res.sendStatus(500);
    } 
});

app.patch('/ventas/editar', (req, res)=>{
    const edicion = req.body;
    const filtroVenta = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    };
    conexion.collection('venta').findOneAndUpdate(filtroVenta, operacion, {upsert:true, returnoriginal:true},(err, result) =>{
        if(err){
            console.error("Error venta usuario", err);
            res.sendStatus(500);
        }
        else{
            console.log('Actualizado con exito');
            res.sendStatus(200);
        }
    });
});

app.delete('/ventas/eliminar', (req, res)=>{
    const filtroVenta ={_id: new ObjectId(req.body.id)};
    conexion.collection('venta').deleteOne(filtroVenta,(err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
    });
});

//CRUD PRODUCTOS

app.get('/productos', (req, res)=>{
    console.log('Alguien hizo get en la barra /productos');
    conexion.collection("producto").find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.status(400).send('error consultando los productos');
        }else{
            res.json(result);
        }
    });
});

app.post('/productos/nuevo', (req, res)=>{
    const datosProducto = req.body;
    console.log('llaves: ', Object.keys(datosProducto));
    try{
        if(
            Object.keys(datosProducto).includes('article')&& 
            Object.keys(datosProducto).includes('value_venta')&&
             Object.keys(datosProducto).includes('status_venta')
        ){
            conexion.collection('producto').insertOne(datosProducto, (err, result) => {
                if(err) {
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        
       }
    else{
        
    } 
    }catch{
        res.sendStatus(500);
    } 
});

app.patch('/productos/editar', (req, res)=>{
    const edicion = req.body;
    const filtroProducto = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    };
    conexion.collection('producto').findOneAndUpdate(filtroProducto, operacion, {upsert:true, returnoriginal:true},(err, result) =>{
        if(err){
            console.error("Error actualizar producto", err);
            res.sendStatus(500);
        }
        else{
            console.log('Actualizado con exito');
            res.sendStatus(200);
        }
    });
});

app.delete('/productos/eliminar', (req, res)=>{
    const filtroProducto ={_id: new ObjectId(req.body.id)};
    conexion.collection('producto').deleteOne(filtroProducto,(err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
    });
});

// CRUD USUARIOS

app.get('/usuarios', (req, res)=>{
    console.log('Alguien hizo get en la barra /usuarios');
    conexion.collection("usuario").find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.status(400).send('error consultando los usuarios');
        }else{
            res.json(result);
        }
    });
});

app.post('/usuarios/nuevo', (req, res)=>{
    const datosUsuario = req.body;
    console.log('llaves: ', Object.keys(datosUsuario));
    try{
        if(
            Object.keys(datosUsuario).includes('name')&& 
            Object.keys(datosUsuario).includes('lastname')
        ){
            conexion.collection('usuario').insertOne(datosUsuario, (err, result) => {
                if(err) {
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        
       }
    else{
        
    } 
    }catch{
        res.sendStatus(500);
    } 
});

app.patch('/usuarios/editar', (req, res)=>{
    const edicion = req.body;
    const filtroUsuario = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    };
    conexion.collection('usuario').findOneAndUpdate(filtroUsuario, operacion, {upsert:true, returnoriginal:true},(err, result) =>{
        if(err){
            console.error("Error actualizar usuario", err);
            res.sendStatus(500);
        }
        else{
            console.log('Actualizado con exito');
            res.sendStatus(200);
        }
    });
});

app.delete('/usuarios/eliminar', (req, res)=>{
    const filtroUsuario ={_id: new ObjectId(req.body.id)};
    conexion.collection('usuario').deleteOne(filtroUsuario,(err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
    });
});


const main = ()=>{
    
    client.connect((err, db)=>{
        if(err){
            console.log("error conexion base de datos");

        }
        conexion = db.db('SportsShop');
        console.log("conexion exita");
        return app.listen(PORT, ()=>{
            console.log(`escuchando puerto ${PORT}`);
    });
});
};

main();