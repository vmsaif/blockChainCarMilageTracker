import Api from '@/services/api'

export default {
  
  queryAll() {
    return Api().get('queryAll')
  },
  
  registerUser(role, username, password, code) {
    return Api().post('registerUser', {
      role: role,
      username: username,
      password: password,
      code: code
    })
  },
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