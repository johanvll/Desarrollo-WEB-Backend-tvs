import { Injectable } from '@nestjs/common';

// Datos de ejemplo para la demo en la nube (evita errores de BD)
const productosDemo = [
  { id: 1, marca: 'Samsung', modelo: 'QLED 4K', pulgadas: 65, precio: 899, imagen_url: 'https://placehold.co/400x300/4CAF50/white?text=Samsung' },
  { id: 2, marca: 'LG', modelo: 'OLED evo', pulgadas: 55, precio: 1299, imagen_url: 'https://placehold.co/400x300/A50034/white?text=LG' },
  { id: 3, marca: 'Sony', modelo: 'Bravia XR', pulgadas: 65, precio: 1599, imagen_url: 'https://placehold.co/400x300/000000/white?text=Sony' },
  { id: 4, marca: 'TCL', modelo: 'Google TV', pulgadas: 50, precio: 399, imagen_url: 'https://placehold.co/400x300/E31837/white?text=TCL' },
];

@Injectable()
export class TvService {
  // Devuelve los productos de ejemplo
  async findAll() {
    return productosDemo;
  }

  // Las demás funciones se mantienen como fallback
  async create(data: any) { return { message: 'Función no disponible en la demo online.' }; }
  async update(id: number, data: any) { return { message: 'Función no disponible en la demo online.' }; }
  async deleteLogic(id: number) { return { message: 'Función no disponible en la demo online.' }; }
}