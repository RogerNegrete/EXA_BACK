import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { validarArticulo, validarParcial } from './helpers/zod.js';

const app = express();
const PORT = process.env.PORT || 3001; 


app.use(cors({
  origin: 'https://exa-front-stevenegrete12-gmailcoms-projects.vercel.app/'
}));
app.use(express.json());+


mongoose.connect('mongodb+srv://roger:roger1475@cluster0.ou6e8.mongodb.net/examen?retryWrites=true&w=majority',
//mongoose.connect('mongodb+srv://roger:roger1475@cluster0.ou6e8.mongodb.net/examen?retryWrites=true&w=majority',
 {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

const itemSchema = new mongoose.Schema({
  estacion: { type: Number, default: 0  },
  nivel_productividad: { type: String, required: true },
  produccion_dia:{ type: Number, default: 0 },
  total_produccion: { type: Number, default: 0 }
});

const Item = mongoose.model('Estacion', itemSchema);

const calcularCostoEstacion = (datos) => {
  //const costoBase = datos.seguro === 'A' ? 1200 : 950;
  //let costoTotal = costoBase;
  array.forEach(element => {
    const Estacion_select= datos.estacion[element];
  });
  
  let total_produccion =0;

 array.forEach(element => {
  datos.Estacion_select[element] += total_produccion += estacion.produccion_dia[element];

 });
 
  return total_produccion;
};

app.get('/api/estacion', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los items' });
  }
});

app.post('/api/estacion', async (req, res) => {
  try {
    const validacion = validarArticulo(req.body);
    if (!validacion.success) {
      return res.status(400).json({ error: validacion.error });
    }
    
    const costoCalculado = calcularCostoEstacion(validacion.data);
    const nuevoItem = new Item({ ...validacion.data, total_produccion: costoCalculado });
    const savedItem = await nuevoItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
