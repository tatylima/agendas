import { Injectable} from '@nestjs/common';
import { createProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService{
    create(createProfileDto:createProfileDto){
        return ' Adiciona um novo perfil';
    }
    findAll(){
        return ' Retornar todos os perfis';
    }
    findOne(id:number){
        return ' Retorna um id do perfil';
    }
    update(id:number, UpdateProfileDto:UpdateProfileDto){
        return ' Retorna atualização de id do perfil';
    }
    delete(id:number){
        return ' Deletar um perfil';
    }
}