import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from '../regiones/entities/region.entity';
import { CiudadEntity } from '../ciudades/entities/ciudad.entity';
import { PlatoEntity } from '../platos/entities/plato.entity';
import { RestauranteEntity } from '../restaurantes/entities/restaurante.entity';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(RegionEntity)
    private regionRepo: Repository<RegionEntity>,
    @InjectRepository(CiudadEntity)
    private ciudadRepo: Repository<CiudadEntity>,
    @InjectRepository(PlatoEntity)
    private platoRepo: Repository<PlatoEntity>,
    @InjectRepository(RestauranteEntity)
    private restauranteRepo: Repository<RestauranteEntity>,
    @InjectRepository(UsuarioEntity)
    private usuarioRepo: Repository<UsuarioEntity>,
  ) {}

  async seed() {
    try {
      console.log('🌱 Iniciando seed de datos...');

      // 1. CREAR REGIONES
      const caribe = await this.regionRepo.save({
        nombre: 'Caribe',
        descripcion: 'Región costera con influencias africanas, españolas e indígenas. Rica en mariscos y sabores tropicales.',
        imagenUrl: 'https://via.placeholder.com/300?text=Caribe',
      });

      const andina = await this.regionRepo.save({
        nombre: 'Andina',
        descripcion: 'Región montañosa conocida por café, papa y tradiciones españolas coloniales.',
        imagenUrl: 'https://via.placeholder.com/300?text=Andina',
      });

      const pacifica = await this.regionRepo.save({
        nombre: 'Pacífica',
        descripcion: 'Región selvática de la costa pacífica con biodiversidad única y influencias afrocolombianas.',
        imagenUrl: 'https://via.placeholder.com/300?text=Pacifica',
      });

      const orinoquía = await this.regionRepo.save({
        nombre: 'Orinoquía',
        descripcion: 'Llanuras con tradición ganadera y cultura llanera.',
        imagenUrl: 'https://via.placeholder.com/300?text=Orinoquía',
      });

      const amazonia = await this.regionRepo.save({
        nombre: 'Amazonia',
        descripcion: 'Región selvática con comunidades indígenas y ingredientes únicos.',
        imagenUrl: 'https://via.placeholder.com/300?text=Amazonia',
      });

      console.log('✅ Regiones creadas');

      // 2. CREAR CIUDADES
      const cartagena = await this.ciudadRepo.save({
        nombre: 'Cartagena',
        regionId: caribe.id,
        descripcion: 'Ciudad patrimonial con patrimonio histórico y gastronómico',
      });

      const santaMarta = await this.ciudadRepo.save({
        nombre: 'Santa Marta',
        regionId: caribe.id,
        descripcion: 'Puerta a la Sierra Nevada con gastronomía costera',
      });

      const medellin = await this.ciudadRepo.save({
        nombre: 'Medellín',
        regionId: andina.id,
        descripcion: 'Capital antioqueña con tradiciones culinarias únicas',
      });

      const bogota = await this.ciudadRepo.save({
        nombre: 'Bogotá',
        regionId: andina.id,
        descripcion: 'Capital del país con gastronomía multicultural',
      });

      const cali = await this.ciudadRepo.save({
        nombre: 'Cali',
        regionId: pacifica.id,
        descripcion: 'Capital de la salsa y sabores tropicales',
      });

      console.log('✅ Ciudades creadas');

      // 3. CREAR PLATOS
      const arepa = await this.platoRepo.save({
        nombre: 'Arepas de queso',
        descripcion: 'Arepa tradicional rellena de queso fresco',
        historia: 'Las arepas tienen raíces prehispánicas, eran preparadas por los indígenas Arawacos. La versión costeña con queso es influencia española combinada con ingredientes locales.',
        ingredientes: 'Harina de maíz, queso fresco, sal, agua',
        regionId: caribe.id,
        imagenUrl: 'https://via.placeholder.com/300?text=Arepas',
      });

      const ceviche = await this.platoRepo.save({
        nombre: 'Ceviche',
        descripcion: 'Pescado crudo marinado en limón con verduras',
        historia: 'Plato originario del Perú adoptado en la costa Caribe colombiana. La técnica de cocción con limón llegó con los moros españoles y se adaptó con pescados locales.',
        ingredientes: 'Pescado blanco, limón, tomate, cebolla, cilantro',
        regionId: caribe.id,
        imagenUrl: 'https://via.placeholder.com/300?text=Ceviche',
      });

      const bandejaPaisa = await this.platoRepo.save({
        nombre: 'Bandeja Paisa',
        descripcion: 'Plato contundente y variado típico de Antioquia',
        historia: 'Surge de la mezcla entre tradición española e ingredientes locales. Era comida de arrieros antes de viajes por montañas. Evoluciona para ser ícono cultural que representa identidad paisa.',
        ingredientes: 'Frijoles, arroz, carne molida, huevo frito, arepa, aguacate, tomate, patacón, queso fresco, chorizo, morcilla',
        regionId: andina.id,
        imagenUrl: 'https://via.placeholder.com/300?text=Bandeja+Paisa',
      });

      const ajiaco = await this.platoRepo.save({
        nombre: 'Ajiaco Bogotano',
        descripcion: 'Caldo tradicional con papas de la sabana',
        historia: 'Caldo tradicional de la sabana de Bogotá, beneficiado por las tres tipos de papa de la región andina. Era comida de los muiscas precolombinos adaptada tras la conquista.',
        ingredientes: 'Papa criolla, papa pastusa, papa sabanera, pollo, caldo de carne, aguacate, crema',
        regionId: andina.id,
        imagenUrl: 'https://via.placeholder.com/300?text=Ajiaco',
      });

      const cazuela = await this.platoRepo.save({
        nombre: 'Cazuela de Mariscos',
        descripcion: 'Combinación de mariscos en salsa',
        historia: 'Herencia de la gastronomía marinera africana combinada con técnicas españolas. El coco es ingrediente clave que llega del comercio colonial.',
        ingredientes: 'Camarones, calamares, mejillones, coco, cebolla, ajo, cilantro',
        regionId: pacifica.id,
        imagenUrl: 'https://via.placeholder.com/300?text=Cazuela',
      });

      console.log('✅ Platos creados');

      // 4. CREAR RESTAURANTES
      const corralDelPrincipe = await this.restauranteRepo.save({
        nombre: 'El Corral del Príncipe',
        descripcion: 'Restaurante tradicional con recetas ancestrales',
        direccion: 'Calle Principal 123, Cartagena',
        telefono: '+57 300 123 4567',
        ciudadId: cartagena.id,
        horario: '11am-10pm',
        imagenUrl: 'https://via.placeholder.com/300?text=Corral+Principe',
      });

      const mondongueria = await this.restauranteRepo.save({
        nombre: "Mondongo's",
        descripcion: 'Especialista en platos tradicionales antioqueños',
        direccion: 'Calle 10 #45-67, Medellín',
        telefono: '+57 301 987 6543',
        ciudadId: medellin.id,
        horario: '12pm-11pm',
        imagenUrl: 'https://via.placeholder.com/300?text=Mondongueria',
      });

      const laMaracena = await this.restauranteRepo.save({
        nombre: 'La Macarena',
        descripcion: 'Gastronomía contemporánea bogotana',
        direccion: 'Carrera 5 #26-27, Bogotá',
        telefono: '+57 302 654 3210',
        ciudadId: bogota.id,
        horario: '12pm-10pm',
        imagenUrl: 'https://via.placeholder.com/300?text=La+Maracena',
      });

      const ajiRojo = await this.restauranteRepo.save({
        nombre: 'Ají Rojo',
        descripcion: 'Sabores del Caribe y la costa',
        direccion: 'Calle 1 #2-3, Cali',
        telefono: '+57 303 321 1234',
        ciudadId: cali.id,
        horario: '11am-11pm',
        imagenUrl: 'https://via.placeholder.com/300?text=Aji+Rojo',
      });

      console.log('✅ Restaurantes creados');

      // 5. CREAR USUARIO DE PRUEBA
      const usuario = await this.usuarioRepo.save({
        nombre: 'Admin Saborea',
        email: 'admin@saboreacolombia.com',
        contraseña: 'hashedPassword123',
        rol: 'administrador',
        activo: true,
      });

      console.log('✅ Usuario creado');

      console.log('\n🌱 ¡Seed completado exitosamente!');
      console.log(`✅ ${await this.regionRepo.count()} regiones`);
      console.log(`✅ ${await this.ciudadRepo.count()} ciudades`);
      console.log(`✅ ${await this.platoRepo.count()} platos`);
      console.log(`✅ ${await this.restauranteRepo.count()} restaurantes`);
      console.log(`✅ ${await this.usuarioRepo.count()} usuarios`);
    } catch (error) {
      console.error('❌ Error en seed:', error);
      throw error;
    }
  }
}