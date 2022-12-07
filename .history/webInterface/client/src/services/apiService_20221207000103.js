import Api from '@/services/api'

export default {
  
  addCar(vin,make,model,year,milage,ownerFirstName, ownerLastName){
    return Api().post('addCar', {
      ownerFirstName:ownerFirstName,
      ownerLastName:ownerLastName,
      vin:vin,
      make:make,
      model:model,
      year:year,
      milage,milage
    })
  }, 
  queryByVim(vim) {
    return Api().post('queryByVim', {
      vim:vim
    })
  }
}