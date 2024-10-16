import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('bootcamp')
export class BootcampController {

    @Get()
    getAllBootcamps(): string{
        return " Aqui se mostrara todos los bootcamps"
    }

@Get(":id")
getBootcampsById(@Param('id') id: string): string {
    return "Aqui se va a mostrar el bootcamp con el id"
}

@Post()
createBootcamp(): string {
    return "Aqui se van a crear Bootcamps"
}

@Put(":id")
updateBootcamp(@Param(":id") id: string): string {
    return `Aqui se van a actualizar el bootcamp: ${id}`
}


@Delete("id")
deleteBootcamp(@Param("id") id:string) : string {
    return `Aqui se van a actualizar el bootcamp: ${id}`
}


} 