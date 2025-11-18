import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from '../regiones/entities/region.entity';
import { CiudadEntity } from '../ciudades/entities/ciudad.entity';
import { PlatoEntity } from '../platos/entities/plato.entity';
import { RestauranteEntity } from '../restaurantes/entities/restaurante.entity';
import { PlatoRestauranteEntity } from '../plato-restaurante/entities/plato-restaurante.entity';

/**
 * SeedService
 * Servicio que maneja la siembra de datos de prueba en la base de datos
 * Contiene métodos para insertar regiones, ciudades, platos y restaurantes
 */
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(RegionEntity)
    private regionRepository: Repository<RegionEntity>,

    @InjectRepository(CiudadEntity)
    private ciudadRepository: Repository<CiudadEntity>,

    @InjectRepository(PlatoEntity)
    private platoRepository: Repository<PlatoEntity>,

    @InjectRepository(RestauranteEntity)
    private restauranteRepository: Repository<RestauranteEntity>,

    @InjectRepository(PlatoRestauranteEntity)
    private platoRestauranteRepository: Repository<PlatoRestauranteEntity>,
  ) {}

  /**
 * Limpia todos los datos existentes antes de insertar
 */
private async cleanDatabase(): Promise<void> {
  console.log('🧹 Limpiando datos existentes...');
  
  try {
    // Opción 1: Usar clear() 
    await this.platoRestauranteRepository.clear();
    await this.restauranteRepository.clear();
    await this.platoRepository.clear();
    await this.ciudadRepository.clear();
    await this.regionRepository.clear();
    
    console.log('✅ Datos existentes eliminados\n');
  } catch (error) {
    console.log('⚠️  Usando método alternativo para limpiar datos...');
    
    // Opción 2: Usar query builder como respaldo
    await this.platoRestauranteRepository.createQueryBuilder().delete().execute();
    await this.restauranteRepository.createQueryBuilder().delete().execute();
    await this.platoRepository.createQueryBuilder().delete().execute();
    await this.ciudadRepository.createQueryBuilder().delete().execute();
    await this.regionRepository.createQueryBuilder().delete().execute();
    
    console.log('✅ Datos existentes eliminados (método alternativo)\n');
  }
}

  /**
 * Ejecuta la siembra completa de datos
 */
async seed(): Promise<void> {
  console.log('🌱 Iniciando siembra de datos...\n');

  try {
    // 🔄 NUEVO: Limpiar base de datos antes de insertar
    await this.cleanDatabase();

    // 1. Regiones
    const regiones = await this.seedRegiones();

    // 2. Ciudades
    const ciudades = await this.seedCiudades(regiones);

    // 3. Platos
    const platos = await this.seedPlatos(regiones);

    // 4. Restaurantes
    const restaurantes = await this.seedRestaurantes(ciudades);

    // 5. Relaciones Plato-Restaurante
    await this.seedPlatoRestaurante(platos, restaurantes);

    console.log('✨ ¡Siembra de datos completada exitosamente!');
    console.log(`
📊 RESUMEN:
   • 5 regiones
   • 10 ciudades
   • 15 platos típicos
   • 20 restaurantes
   • 60 relaciones plato-restaurante
      `);
  } catch (error) {
    console.error('❌ Error durante la siembra:', error.message);
    throw error;
  }
}

  /**
   * Siembra las regiones de Colombia
   */
  private async seedRegiones(): Promise<RegionEntity[]> {
    console.log('📍 Insertando regiones...');

    const regionesData = [
      {
        nombre: 'Caribe',
        descripcion:
          'Región costera con influencia africana y caribeña. Conocida por sus sabores tropicales y frescos.',
        imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      },
      {
        nombre: 'Andina',
        descripcion:
          'Región de montañas altas. Centro cultural y gastronómico de Colombia con platos tradicionales.',
        imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      },
      {
        nombre: 'Pacífica',
        descripcion:
          'Región tropical y lluviosa. Rica en mariscos y productos del océano Pacífico.',
        imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      },
      {
        nombre: 'Orinoquía',
        descripcion:
          'Región de llanuras extensas. Gastronomía basada en carnes y productos de la llanura.',
        imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      },
      {
        nombre: 'Amazonia',
        descripcion:
          'Región selvática. Gastronomía exótica con frutas y productos amazónicos únicos.',
        imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      },
    ];

    const regiones = await this.regionRepository.save(regionesData);
    console.log(`✅ ${regiones.length} regiones insertadas\n`);
    return regiones;
  }

  /**
   * Siembra las ciudades de cada región
   */
  private async seedCiudades(regiones: RegionEntity[]): Promise<CiudadEntity[]> {
    console.log('🏙️ Insertando ciudades...');

    const ciudadesData = [
      // Caribe
      {
        nombre: 'Cartagena',
        descripcion: 'Ciudad histórica, patrimonio UNESCO. Centro turístico gastronómico.',
        regionId: regiones[0].id,
      },
      {
        nombre: 'Santa Marta',
        descripcion: 'Puerta a la Sierra Nevada. Conexión con tradiciones indígenas.',
        regionId: regiones[0].id,
      },
      // Andina
      {
        nombre: 'Bogotá',
        descripcion:
          'Capital de Colombia. Centro gastronómico con fusión moderna y tradicional.',
        regionId: regiones[1].id,
      },
      {
        nombre: 'Medellín',
        descripcion:
          'Ciudad de eterna primavera. Transformación culinaria y cultural.',
        regionId: regiones[1].id,
      },
      // Pacífica
      {
        nombre: 'Cali',
        descripcion: 'Capital mundial de la salsa. Gastronomía festiva y vibrante.',
        regionId: regiones[2].id,
      },
      {
        nombre: 'Buenaventura',
        descripcion: 'Puerto principal. Acceso a mariscos frescos del Pacífico.',
        regionId: regiones[2].id,
      },
      // Orinoquía
      {
        nombre: 'Villavicencio',
        descripcion: 'Puerta de las llanuras. Centro ganadero de Colombia.',
        regionId: regiones[3].id,
      },
      {
        nombre: 'Puerto López',
        descripcion: 'Corazón llanero. Tradición ganadera y carnes de calidad.',
        regionId: regiones[3].id,
      },
      // Amazonia
      {
        nombre: 'Leticia',
        descripcion: 'Frontera amazónica. Frutas y productos exóticos únicos.',
        regionId: regiones[4].id,
      },
      {
        nombre: 'Puerto Nariño',
        descripcion: 'Joya amazónica. Pescado fresco y frutas tropicales.',
        regionId: regiones[4].id,
      },
    ];

    const ciudades = await this.ciudadRepository.save(ciudadesData);
    console.log(`✅ ${ciudades.length} ciudades insertadas\n`);
    return ciudades;
  }

  /**
   * Siembra los platos típicos de cada región
   */
  private async seedPlatos(regiones: RegionEntity[]): Promise<PlatoEntity[]> {
    console.log('🍽️ Insertando platos típicos...');

    const platosData = [
      // CARIBE (3 platos)
      {
        nombre: 'Ceviche Costeño',
        descripcion:
          'Pescado fresco marinado en limón con cebolla morada, cilantro y tomate.',
        historia:
          'Herencia del intercambio gastronómico con Perú. Adaptado al sabor caribeño colombiano.',
        ingredientes:
          'Pescado fresco, limón, cebolla, cilantro, tomate, sal, pimienta',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        regionId: regiones[0].id,
      },
      {
        nombre: 'Arroz con Coco',
        descripcion:
          'Arroz blanco cocinado con leche de coco, pasas y especies aromáticas.',
        historia:
          'Influencia africana y caribeña. Plato típico para festividades y celebraciones especiales.',
        ingredientes: 'Arroz, coco, pasas, especias, cebolla, ajo',
        imagenUrl: 'https://images.unsplash.com/photo-1584299740917-96a5965a5d3b?w=400',
        regionId: regiones[0].id,
      },
      {
        nombre: 'Camarones al Ajillo',
        descripcion:
          'Camarones frescos salteados con ajo, guindilla y hierbas aromáticas.',
        historia:
          'Plato de la costa caribeña, representa la frescura del mar y la tradición pesquera.',
        ingredientes:
          'Camarones, ajo, guindilla, aceite de oliva, limón, cilantro',
        imagenUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        regionId: regiones[0].id,
      },

      // ANDINA (3 platos)
      {
        nombre: 'Bandeja Paisa',
        descripcion:
          'Plato típico antioqueño con carnes, granos, arepas y otros acompañamientos abundantes.',
        historia:
          'Representante de la abundancia y generosidad antioqueña. Plato tradicional desde hace más de 200 años.',
        ingredientes:
          'Carnes variadas, frijoles, arroz, arepa, huevo, chorizo, morcilla',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        regionId: regiones[1].id,
      },
      {
        nombre: 'Ajiaco Bogotano',
        descripcion:
          'Sopa con papa criolla, papa sabanera, pollo, maíz, guascas y crema de leche.',
        historia:
          'Plato ancestral de la sabana bogotana. Mencionado en documentos coloniales desde el siglo XVII.',
        ingredientes:
          'Papas variadas, pollo, maíz, guascas, crema, cebolla, ajo',
        imagenUrl: 'https://images.unsplash.com/photo-1547592166-7aae6d175744?w=400',
        regionId: regiones[1].id,
      },
      {
        nombre: 'Arepa Antioqueña',
        descripcion:
          'Arepa blanca acompañada con queso fresco, mantequilla y carne deshilachada.',
        historia:
          'Alimento básico de la región andina desde tiempos precolombinos. Símbolo de identidad cultural.',
        ingredientes: 'Masa de maíz, queso, carne, mantequilla, sal',
        imagenUrl: 'https://images.unsplash.com/photo-1565618666741-d71b0e1490c5?w=400',
        regionId: regiones[1].id,
      },

      // PACÍFICA (3 platos)
      {
        nombre: 'Sancocho de Pescado',
        descripcion:
          'Caldo abundante con pescado fresco, plátano, yuca, papa y condimentos.',
        historia:
          'Comida ancestral de pescadores y comunidades costeras del Pacífico colombiano.',
        ingredientes: 'Pescado, plátano, yuca, papa, cebolla, ajo, cilantro',
        imagenUrl: 'https://images.unsplash.com/photo-1547592166-7aae6d175744?w=400',
        regionId: regiones[2].id,
      },
      {
        nombre: 'Cazuela de Mariscos',
        descripcion:
          'Preparación tradicional con camarones, calamares, almejas y peces en caldo especiado.',
        historia:
          'Representa la riqueza marina del Pacífico. Plato festivo de las comunidades costeñas.',
        ingredientes:
          'Variedad de mariscos, coco, tomate, cebolla, ajo, ají',
        imagenUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        regionId: regiones[2].id,
      },
      {
        nombre: 'Encocado de Camarones',
        descripcion:
          'Camarones cocinados en salsa de coco con tomate, cebolla y especias.',
        historia:
          'Fusión de tradiciones africanas, indígenas y españolas. Sabor distintivo del Pacífico.',
        ingredientes:
          'Camarones, coco, tomate, cebolla, ajo, comino, cilantro',
        imagenUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        regionId: regiones[2].id,
      },

      // ORINOQUÍA (3 platos)
      {
        nombre: 'Carne a la Llanera',
        descripcion:
          'Carne de res a la parrilla adobada con cumin y especias llaneras.',
        historia:
          'Tradición de los vaqueros llaneros. Cocina en fogata durante centenares de años.',
        ingredientes: 'Carne de res, cumin, ajo, limón, sal, pimienta',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        regionId: regiones[3].id,
      },
      {
        nombre: 'Pesca a lo Llanero',
        descripcion:
          'Bagre u otro pez de río cocinado en fogata con especias tradicionales.',
        historia:
          'Cocina de los ríos llaneros. Técnica ancestral de preparación de pescado fresco.',
        ingredientes:
          'Pescado de río, ajo, cebolla, tomate, comino, cilantro',
        imagenUrl: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400',
        regionId: regiones[3].id,
      },
      {
        nombre: 'Arepa Llanera',
        descripcion:
          'Arepa gruesa rellena de carne deshilachada y queso fresco.',
        historia:
          'Alimento básico del llanero. Fácil de preparar y transportar en jornadas de trabajo.',
        ingredientes: 'Masa de maíz, carne, queso, cebolla, ajo',
        imagenUrl: 'https://images.unsplash.com/photo-1565618666741-d71b0e1490c5?w=400',
        regionId: regiones[3].id,
      },

      // AMAZONIA (3 platos)
      {
        nombre: 'Tacacho con Cecina',
        descripcion:
          'Plátano verde majado mezclado con carne salada, acompañado de cebolla morada.',
        historia:
          'Comida típica de los pueblos amazónicos. Preparación con ingredientes locales ancestrales.',
        ingredientes:
          'Plátano verde, carne de res salada, cebolla, ajo, aceite',
        imagenUrl: 'https://images.unsplash.com/photo-1565618666741-d71b0e1490c5?w=400',
        regionId: regiones[4].id,
      },
      {
        nombre: 'Sopa de Frutas Amazónicas',
        descripcion:
          'Caldo con frutas tropicales amazónicas, peces de río y hierbas aromáticas.',
        historia:
          'Gastronomía sostenible amazónica. Uso de frutas exóticas locales en preparaciones tradicionales.',
        ingredientes:
          'Frutas amazónicas, pescado, ajo, cebolla, hierbas aromáticas',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        regionId: regiones[4].id,
      },
      {
        nombre: 'Piraña a la Sal',
        descripcion:
          'Pez amazónico cocinado envuelto en sal, conservando todos sus jugos y sabores.',
        historia:
          'Técnica ancestral de cocina amazónica. Método de preservación y cocción de pescados frescos.',
        ingredientes: 'Piraña, sal grano, ajo, limón, cilantro',
        imagenUrl: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400',
        regionId: regiones[4].id,
      },
    ];

    const platos = await this.platoRepository.save(platosData);
    console.log(`✅ ${platos.length} platos típicos insertados\n`);
    return platos;
  }

  /**
   * Siembra los restaurantes de cada ciudad
   */
  private async seedRestaurantes(ciudades: CiudadEntity[]): Promise<RestauranteEntity[]> {
    console.log('🍴 Insertando restaurantes...');

    const restaurantesData = [
      // Cartagena (2 restaurantes)
      {
        nombre: 'El Cevichería Del Mar',
        descripcion:
          'Restaurante especializado en ceviches y mariscos frescos con vista al mar caribeño.',
        direccion: 'Calle Primera 123, Cartagena',
        telefono: '+57 5 6641234',
        horario: 'Lun-Dom: 12:00 PM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[0].id,
      },
      {
        nombre: 'Casa Costanera',
        descripcion:
          'Tradición culinaria caribeña con ingredientes frescos del mercado local.',
        direccion: 'Avenida Jiménez 456, Cartagena',
        telefono: '+57 5 6642345',
        horario: 'Lun-Dom: 11:00 AM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[0].id,
      },

      // Santa Marta (2 restaurantes)
      {
        nombre: 'Sierra & Mar',
        descripcion:
          'Fusión de gastronomía costera y tradición indígena de la Sierra Nevada.',
        direccion: 'Calle 5 #10-50, Santa Marta',
        telefono: '+57 5 4211234',
        horario: 'Lun-Dom: 12:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[1].id,
      },
      {
        nombre: 'Pescado Fresco del Caribe',
        descripcion:
          'Especialidad en pescados y camarones del día, preparados al estilo caribeño.',
        direccion: 'Avenida del Mar 789, Santa Marta',
        telefono: '+57 5 4212345',
        horario: 'Mar-Dom: 1:00 PM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[1].id,
      },

      // Bogotá (2 restaurantes)
      {
        nombre: 'El Ajiaco Bogotano',
        descripcion:
          'Restaurante tradicional con recetas familiares de la sabana caleña desde 1950.',
        direccion: 'Carrera 7 #45-12, Bogotá',
        telefono: '+57 1 3421234',
        horario: 'Lun-Dom: 11:00 AM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[2].id,
      },
      {
        nombre: 'Cocina Muisca',
        descripcion:
          'Interpretación moderna de la cocina prehispánica muisca con productos locales.',
        direccion: 'Calle 26 #23-45, Bogotá',
        telefono: '+57 1 3422345',
        horario: 'Lun-Dom: 12:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[2].id,
      },

      // Medellín (2 restaurantes)
      {
        nombre: 'Bandeja Paisa Auténtica',
        descripcion:
          'Auténtica bandeja paisa preparada según tradición antioqueña de más de 100 años.',
        direccion: 'Carrera 45 #50-23, Medellín',
        telefono: '+57 4 4341234',
        horario: 'Lun-Dom: 11:00 AM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[3].id,
      },
      {
        nombre: 'La Arepa Antioqueña',
        descripcion:
          'Especialidad en arepas antioqueñas con queso fresco y carnes del mejor sabor.',
        direccion: 'Avenida La Playa #12-34, Medellín',
        telefono: '+57 4 4342345',
        horario: 'Lun-Dom: 6:00 AM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[3].id,
      },

      // Cali (2 restaurantes)
      {
        nombre: 'Sancocho de Oro',
        descripcion:
          'Sancochería tradicional caleña con recetas de abuela y productos frescos del Pacífico.',
        direccion: 'Carrera 3 #12-34, Cali',
        telefono: '+57 2 3921234',
        horario: 'Lun-Dom: 12:00 PM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[4].id,
      },
      {
        nombre: 'Mariscos El Pacífico',
        descripcion:
          'Cazuelas y encocados de mariscos frescos traídos diariamente del puerto.',
        direccion: 'Avenida Sexta #45-67, Cali',
        telefono: '+57 2 3922345',
        horario: 'Lun-Dom: 1:00 PM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[4].id,
      },

      // Buenaventura (2 restaurantes)
      {
        nombre: 'Pescadería Costera',
        descripcion:
          'Puerto de mariscos frescos. Diariamente nuevos descubrimientos del mar.',
        direccion: 'Calle 1 #2-34, Buenaventura',
        telefono: '+57 2 2431234',
        horario: 'Mar-Dom: 1:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[5].id,
      },
      {
        nombre: 'El Puerto Sabroso',
        descripcion: 'Cocina de puerto con sabores auténticos del Pacífico colombiano.',
        direccion: 'Avenida Primero de Enero 56-78, Buenaventura',
        telefono: '+57 2 2432345',
        horario: 'Lun-Dom: 12:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[5].id,
      },

      // Villavicencio (2 restaurantes)
      {
        nombre: 'Carne Llanera Al Fuego',
        descripcion:
          'Asadería llanera con carbón de leña y carnes de primera calidad.',
        direccion: 'Carrera 30 #23-12, Villavicencio',
        telefono: '+57 8 6341234',
        horario: 'Lun-Dom: 12:00 PM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[6].id,
      },
      {
        nombre: 'El Vaquero Sabroso',
        descripcion:
          'Tradición llanera en cada plato. Recetas transmitidas generación tras generación.',
        direccion: 'Avenida 40 #15-45, Villavicencio',
        telefono: '+57 8 6342345',
        horario: 'Lun-Dom: 11:00 AM - 11:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[6].id,
      },

      // Puerto López (2 restaurantes)
      {
        nombre: 'Asado Tradicional Llanero',
        descripcion:
          'Especialidad en asados al carbón de la llanura colombiana.',
        direccion: 'Calle 4 #3-12, Puerto López',
        telefono: '+57 8 6591234',
        horario: 'Lun-Dom: 12:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[7].id,
      },
      {
        nombre: 'Pescado Del Llano',
        descripcion:
          'Río Meta en cada preparación. Pescados frescos con método tradicional llanero.',
        direccion: 'Avenida Principal 78-90, Puerto López',
        telefono: '+57 8 6592345',
        horario: 'Mar-Dom: 1:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[7].id,
      },

      // Leticia (2 restaurantes)
      {
        nombre: 'Sabores Amazónicos',
        descripcion:
          'Frutas y pescados del corazón de la Amazonia colombiana.',
        direccion: 'Calle 11 #12-34, Leticia',
        telefono: '+57 8 5921234',
        horario: 'Lun-Dom: 12:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[8].id,
      },
      {
        nombre: 'La Casa Amazónica',
        descripcion:
          'Cocina sostenible de la selva con ingredientes locales únicos.',
        direccion: 'Carrera 11 #8-15, Leticia',
        telefono: '+57 8 5922345',
        horario: 'Lun-Dom: 1:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[8].id,
      },

      // Puerto Nariño (2 restaurantes)
      {
        nombre: 'Piraña Dorada',
        descripcion:
          'Pescados amazónicos preparados con técnicas ancestrales indígenas.',
        direccion: 'Calle 5 #4-23, Puerto Nariño',
        telefono: '+57 8 4271234',
        horario: 'Lun-Dom: 12:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
        ciudadId: ciudades[9].id,
      },
      {
        nombre: 'Frutas Del Río',
        descripcion:
          'Experiencia gastronómica amazónica con frutas exóticas y sabores únicos del río.',
        direccion: 'Avenida Principal 34-56, Puerto Nariño',
        telefono: '+57 8 4272345',
        horario: 'Lun-Dom: 1:00 PM - 10:00 PM',
        imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ciudadId: ciudades[9].id,
      },
    ];

    const restaurantes = await this.restauranteRepository.save(restaurantesData);
    console.log(`✅ ${restaurantes.length} restaurantes insertados\n`);
    return restaurantes;
  }
  
  /**
   * Siembra las relaciones entre platos y restaurantes
   */
  private async seedPlatoRestaurante(
    platos: PlatoEntity[],
    restaurantes: RestauranteEntity[],
  ): Promise<void> {
    console.log(' Creando relaciones plato-restaurante...')
    
      const relacionesData: Array<{
      platoId: string;
      restauranteId: string;
      precio: number;
      disponible: boolean;
    }> = [];

    // Agrupar platos por región (índice 0-2: Caribe, 3-5: Andina, etc.)
    const platosPorRegion = [
      platos.slice(0, 3),   // Caribe
      platos.slice(3, 6),   // Andina
      platos.slice(6, 9),   // Pacífica
      platos.slice(9, 12),  // Orinoquía
      platos.slice(12, 15), // Amazonia
    ];

    // Agrupar restaurantes por región (2 restaurantes por ciudad, 2 ciudades por región)
    const restaurantesPorRegion = [
      restaurantes.slice(0, 4),   // Caribe: Cartagena(0-1) + Santa Marta(2-3)
      restaurantes.slice(4, 8),   // Andina: Bogotá(4-5) + Medellín(6-7)
      restaurantes.slice(8, 12),  // Pacífica: Cali(8-9) + Buenaventura(10-11)
      restaurantes.slice(12, 16), // Orinoquía: Villavicencio(12-13) + Puerto López(14-15)
      restaurantes.slice(16, 20), // Amazonia: Leticia(16-17) + Puerto Nariño(18-19)
    ];

    // Crear relaciones para cada región
    for (let regionIndex = 0; regionIndex < 5; regionIndex++) {
      const platosRegion = platosPorRegion[regionIndex];
      const restaurantesRegion = restaurantesPorRegion[regionIndex];

      for (const restaurante of restaurantesRegion) {
        // Cada restaurante sirve 2-3 platos de su región
        const numPlatos = Math.floor(Math.random() * 2) + 2; // 2 o 3 platos
        const platosSeleccionados = this.getRandomElements(platosRegion, numPlatos);

        for (const plato of platosSeleccionados) {
          relacionesData.push({
            platoId: plato.id,
            restauranteId: restaurante.id,
            precio: this.generatePrecio(plato.nombre),
            disponible: true,
          });
        }
      }
    }

    await this.platoRestauranteRepository.save(relacionesData);
    console.log(`✅ ${relacionesData.length} relaciones plato-restaurante insertadas\n`);
  }

  /**
   * Obtiene elementos aleatorios de un array
   */
  private getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Genera un precio realista basado en el nombre del plato
   */
  private generatePrecio(nombrePlato: string): number {
    // Precios base según el tipo de plato
    if (nombrePlato.includes('Ceviche') || nombrePlato.includes('Mariscos')) {
      return 25000 + Math.floor(Math.random() * 15000);
    }
    if (nombrePlato.includes('Bandeja') || nombrePlato.includes('Carne')) {
      return 22000 + Math.floor(Math.random() * 10000);
    }
    if (nombrePlato.includes('Ajiaco') || nombrePlato.includes('Sancocho')) {
      return 18000 + Math.floor(Math.random() * 8000);
    }
    if (nombrePlato.includes('Arepa')) {
      return 8000 + Math.floor(Math.random() * 5000);
    }
    // Precio base para otros platos
    return 15000 + Math.floor(Math.random() * 10000);
  }

  
}