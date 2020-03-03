export function isUndefind(value){
    return (typeof value == "undefined")
}

export function getRegions(){
    return window.vueData.regions
}

export function getCustomers(){
    return window.vueData.customers
}

export function getMonthById(monthId){
    return ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'][monthId]
}

export function getDrillingRigs(){
    return window.vueData.drillingRigs.map( item => {
        return {
            id: item.id,
            text: item.text.split('/')[0]
        }
    })
}

export function getAllowedYears(){
    return window.vueData.years.map( year => {
        return {
            value: year.id,
            label: year.text
        }
    })
}

export function getRegionById(regionId){
    let region = getRegions().find( region => region.id==regionId)
    if(isUndefind(region)){
        return `Регион ${regionId} не найден`
    } else {
        return region.text
    }
}

export function getCustomerById(customerId){
    let customer = getCustomers().find( customer => customer.id==customerId)
    if(isUndefind(customer)){
        return `Заказчик ${customerId} не найден`
    } else {
        return customer.text
    }
}

export function getDrillingRigsById(drillingRigId){
    let drillingRig = getDrillingRigs().find( drillingRig => drillingRig.id==drillingRigId)
    if(isUndefind(drillingRig)){
        return `Месторождение ${drillingRigId} не найдено`
    } else {
        return drillingRig.text
    }
}
