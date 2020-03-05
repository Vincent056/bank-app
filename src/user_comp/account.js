

class Account{
    constructor (type){
        this.id = ' '
        this.type = type
        this.dateCreate = ' '
        this.dateClose = ' '
    }
    getId() {return this.id}
    getType() {return this.type}
    getDateCreate() {return this.dateCreate}
    getDateClose() {return this.dateClose}
}
export default Account