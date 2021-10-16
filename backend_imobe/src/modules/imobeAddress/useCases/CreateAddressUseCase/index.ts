import {AddressRepository} from "@modules/imobeAddress/repositories/factory/AddressRepository";
import {getCustomRepository} from "typeorm";
import {CreateAddressUseCase} from "@modules/imobeAddress/useCases/CreateAddressUseCase/CreateAddressUseCase";
import {CreateAddressController} from "@modules/imobeAddress/useCases/CreateAddressUseCase/CreateAddressController";

const addressRepository = getCustomRepository(AddressRepository);

const createAddressUseCase = new CreateAddressUseCase(addressRepository);

const createAddressController = new CreateAddressController(createAddressUseCase);

export { createAddressUseCase, createAddressController };