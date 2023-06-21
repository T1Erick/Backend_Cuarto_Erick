import { Injectable } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { ProductEntity } from '../entities';
import { Repository } from 'typeorm';
import { CreateProductDto, FilterProductDto, ReadProductDto, UpdateProductDto } from '../dtos';
import { NotFoundException } from '@nestjs/common';
import { FindOptions } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class VentasService {
constructor(
    @Inject(RepositoryEnum.PRODUCT_REPOSITORY)
    private repository:Repository<ProductEntity>
){}
async create(payload: CreateProductDto): Promise<ServiceResponseHttpModel>{
    const newProduct = this.repository.create(payload);
    const productCreated = await this.repository.save(newProduct);

    return {data: plainToInstance(ReadProductDto, productCreated)}
}
async catalogue(): Promise<ServiceResponseHttpModel>{
    const response = this.repository.findAndCount({take: 1000});
    return {data: response[0],
            pagination: {totalItems: response[1], limit: 10}
        };
}
async findall(params?:FilterProductDto): Promise<ServiceResponseHttpModel>{
    if(params?.limit > 0 && params?.page >= 0){
        return await this.paginateAndFilter(params)
    }
    const response = await this.repository.findAndCount({
        order:{updateAt: 'DESC'}
    });
    return {
        data: plainToInstance(ReadProductDto,response[0]),
        pagination:{totalItems: response[1],limit: 10}
    }
}

async findOne(id:number): Promise<ServiceResponseHttpModel>{
    const response= this.repository.findOne({
        where:{id}
    });
    if (!response){
        throw new NotFoundException('El producto no ha sido encontrado')

    }
    return response;
    


}

async update(id:string,payload: UpdateProductDto){
    const response = await this.repository.findOneBy({id});
    if(!response){
        throw new NotFoundException('El producto no ha sido encontrado')
    }
     this.repository.merge(response,payload);
     return this.repository.save(response)
}


async remove(id:string){
    const response = await this.repository.findOneBy({id});
    if(!response){
        throw new NotFoundException('La informacion no ha sido encontado')
    }return this.repository.softRemove(response)
    

}


private async paginateAndFilter(params:FilterProductDto){
    let where:
    |FindOptionsWhere<ProductEntity>
    |FindOptionsWhere<ProductEntity>[];
    
    where={}
    
    let{page,search}=params;
    const {limit}= params;

    
    if (search){
        search =search.trim(),
        page= 0;
        where=[]
    }
}
const data = this.repository.findAndCount({
    relations:
})





}


