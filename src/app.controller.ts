import { Controller, Get , Param , Query} from '@nestjs/common';
import { AppService } from './app.service';
import { Student } from './entities/Student.entity';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Endpoint: puerta del software
  //        -Acepta peticiones de clientes bajo una url Semantica
  //        -Retornar el(los) datos esperados al cliente 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Segundo endpint - ESTRUCTURAR UN ENDPOINT
  //                1.  Verbo (metodo) Http sobre el cual recibir
  //                Metodos disponibles: GET, POST, PUT, DELETE
  //                2. Firma de metodo a ejecutar 
  //                cuando se invoque el endpoint

  @Get("/ficha")
  getFicha(): string {
    return "endpoint de la ficha 2902093"

  }


  @Get("/tarjeta/:id/ciudad/:ciudad")
  tarjeta(@Param("id") id:string , 
          @Param("ciudad") ciudad :string,
          @Query("nombre") nombre : string,
          @Query("edad") edad:number ):Student {
    return new Student (+id, nombre, edad , ciudad);
  }

  
}