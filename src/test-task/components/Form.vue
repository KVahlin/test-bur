<template>
    <div class="spliceForm">
        <span class="spliceForm-header">Год {{year}}</span>
        <form>
            <div class="form-group">
                <label>
                    Филиал
                    <el-tag v-if="region==''" size="mini" type="danger">Обязательно к заполнению</el-tag>
                </label>
                <select v-model="region" class="custom-select" required>
                    <option v-for="region in regions" :value="region.id" :key="region.id" >{{region.text}}</option>
                </select>
            </div>
           
           <div class="form-group">
                <label>
                    Заказчик
                    <el-tag v-if="customer==''" size="mini" type="danger">Обязательно к заполнению</el-tag>
                </label>
                <select v-model="customer" class="custom-select" required>
                    <option v-for="customer in customers" :value="customer.id" :key="customer.id" >{{customer.text}}</option>
                </select>
            </div>

            <div class="form-group">
                <label>
                    Буровая установка
                    <el-tag v-if="drilling==''" size="mini" type="danger">Обязательно к заполнению</el-tag>
                </label>
                <select v-model="drilling" class="custom-select" required>
                    <option v-for="drillingRig in drillingRigs" :value="drillingRig.id" :key="drillingRig.id" >{{drillingRig.text}}</option>
                </select>
            </div>

            <el-row>
                <el-col :span="6" v-for="(currentMonth) in dataMonth" :key="currentMonth.id">
                    <label>{{getMonthById(getMonthIndexById(currentMonth.month))}}</label>
                   <!--  <input @change="validFloat()" class="form-control" v-model="dataMonth[getMonthIndexById(currentMonth.month)].passage" type="text">-->
                    <el-input-number v-model="dataMonth[getMonthIndexById(currentMonth.month)].passage" :controls="false"></el-input-number> 
                </el-col>
            </el-row>
            <el-button class="spliceForm-save" type="success" :disabled="!isValidated" @click="submitForm">Сохранить</el-button>
        </form>
    </div>
</template>

<script>

import { 
    saveRecord,
    updateRecord
} from '.././js/api.js'

import {  
    getRegions,
    getCustomers,
    getDrillingRigs,
    getMonthById
} from '.././js/helpers.js'

export default {
    props: [
        'id',
        'year',
        'region',
        'customer',
        'drilling',
        'dataMonth'
    ],
    data() {
        return {
            
        }
    },
    methods:{
        getMonthIndexById(monthToFind){
            return this.dataMonth.findIndex( currentMonth => currentMonth.month == monthToFind)
        },
        getMonthById(monthId){
            return getMonthById(monthId)
        },
        submitForm(){
            if(this.id>0){
                this.update()
            } else {
                this.save()
            }
        },
        update(){
             let record = {
                id: this.id,
                year: this.year,
                region: this.region,
                customer: this.customer,
                drilling: this.drilling,
                dataMonth: this.dataMonth
            }

            //  Фактически, проверка на корректность ввода числа с точкой осуществляется на уровне ввода значения в компоненте <el-input-number
            //  Для полной уверенности добавим  приведение к float
            for(let key in record.dataMonth) {
                record.dataMonth[key].passage = parseFloat(record.dataMonth[key].passage)
            }
            
            updateRecord(this.id, record).then(() =>   {
                this.$message({
                    message: 'Запись успешно обновлена.',
                    type: 'success'
                });
                this.$emit('complete')
            }).catch((error)=>{
                console.log(error)
                alert('Не удалость обновить запись. Код ошибки #200')
            })
        },
        save(){
            let record = {
                year: this.year,
                region: this.region,
                customer: this.customer,
                drilling: this.drilling,
                dataMonth: this.dataMonth
            }
            saveRecord(record).then(() =>   {
                this.$message({
                    message: 'Запись успешно создана.',
                    type: 'success'
                });
                this.$emit('complete')
            }).catch((error)=>{
                console.log(error)
                alert('Не удалость создать запись. Код ошибки #100')
            })
        },
        
    },
    computed: {
        regions: function(){
            return getRegions()
        },
        customers: function(){
            return getCustomers()
        },
        drillingRigs: function(){
            return getDrillingRigs()
        },
        isValidated: function(){
            return ((this.region>0)&&
                        (this.customer>0)&&
                             (this.drilling>0)
            )
        }
    },
    watch: {
        
    },
    
}
</script>

<style>

    .el-col-6 {
        width: 25% !important;
        padding: 0 1% !important;
        margin-bottom: 16px !important
    }
    
   .spliceForm {
       width: 100%
   }

   .custom-select {
       margin: 0 0 12px 0
   }

   .el-input-number.is-without-controls .el-input__inner {
       padding-left: 8px !important;
       padding-right: 8px !important;
       width: 100% !important
   }

   .el-input-number {
       width: auto !important
   }

    .spliceForm-save {
        margin: 24px 0 0 0 !important
    }

    .spliceForm-header {
        font-weight: bold;
        display: block;
        font-size: 24px;
        margin: 0 0 12px 0
    }

</style>