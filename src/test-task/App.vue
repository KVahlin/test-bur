<template>
    <div class="wrapper">
        
        
        <h1>Обход буровых</h1>
        <div class="selectYear">
            <el-button-group>
                <el-button
                    v-for="item in allowedYears"
                    :key="item.value"
                    @click="selectedYear=item.value"
                    :type="(selectedYear==item.value)?'primary':''">{{item.label}}</el-button>
            </el-button-group>
        </div>

        <template v-if="selectedYear">
            <h2>{{this.selectedYear}}</h2>
            <el-button size="mini" type="primary" @click="newRecord()">Добавить срез</el-button>

            <template v-if="yearData.length==0">
                <div class="alert">
                    Данных за выбранный год нету
                </div>
            </template>

            <table v-if="yearData.length>0">
                <tr>
                    <th>
                        Филиал
                    </th>
                    <th>
                        Заказчик
                    </th>
                    <th>
                    Буровая установка
                    </th>
                    <th>
                        Янв
                    </th>
                    <th>
                        Фев
                    </th>
                    <th>
                        Март
                    </th>
                    <th>
                        Апр
                    </th>
                    <th>
                        Май
                    </th>
                    <th>
                        Июнь
                    </th>
                    <th>
                        Июль
                    </th>
                    <th>
                        Авг
                    </th>
                    <th>
                        Сент
                    </th>
                    <th>
                        Окт
                    </th>
                    <th>
                        Ноя
                    </th>
                    <th>
                        Дек
                    </th>
                    <th>
                        ∑
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                <tr :key="item.id" v-for="(item, index) in this.yearDataParsed">
                    <td>
                    {{(item.region)}}
                    </td>
                    <td>
                        {{(item.customer)}}
                    </td>
                    <td>
                        {{(item.drilling)}}
                    </td>
                    <td>
                        {{item.dataMonth(1)}}
                    </td>
                    <td>
                        {{item.dataMonth(2)}}
                    </td>
                    <td>
                        {{item.dataMonth(3)}}
                    </td>
                    <td>
                        {{item.dataMonth(4)}}
                    </td>
                    <td>
                        {{item.dataMonth(5)}}
                    </td>
                    <td>
                        {{item.dataMonth(6)}}
                    </td>
                    <td>
                        {{item.dataMonth(7)}}
                    </td>
                    <td>
                        {{item.dataMonth(8)}}
                    </td>
                    <td>
                        {{item.dataMonth(9)}}
                    </td>
                    <td>
                        {{item.dataMonth(10)}}
                    </td>
                    <td>
                        {{item.dataMonth(11)}}
                    </td>
                    <td>
                        {{item.dataMonth(12)}}
                    </td>
                    <td>
                        {{item.sum()}}
                    </td>
                    <td>
                        <el-button type="primary" icon="el-icon-edit" @click="editRecord(index)"  circle size="mini"></el-button>
                    </td>
                    <td>   
                        <el-button type="danger" icon="el-icon-delete" @click="removeRecord(item.id, index)" circle size="mini"></el-button>
                    </td>
                </tr>
            </table>
        </template>
        <template v-else>
                Выберите год
        </template>

        <el-dialog
            title="Редактирование среза"
            :visible.sync="dialogVisible"
            width="30%">
            <Form
                v-on:complete="updateTable()"
                :id="sliceToEdit.id"
                :year="sliceToEdit.year"
                :region="sliceToEdit.region"
                :customer="sliceToEdit.customer"
                :drilling="sliceToEdit.drilling"
                :dataMonth="sliceToEdit.dataMonth"></Form>
        </el-dialog>

    </div>
</template>

<script>

import { 
    getYearData,
    removeRecord
} from './js/api.js'
import { 
    isUndefind, 
    getAllowedYears,
    getRegionById,
    getCustomerById,
    getDrillingRigsById
} from './js/helpers.js'
import Form from './components/Form.vue'

export default {
    components: {
        Form
    },
    data() {
        return {
            selectedYear: '',
            yearData: [],
            dialogVisible: false,
            sliceToEdit: {
                id: 0,
                year: 0,
                region: 0,
                customer: 0,
                drilling: 0,
                dataMonth: []
            }
        }
    },
    methods:{
        getRegionById(regionId){
            return getRegionById(regionId)
        },
        getCustomerById(customerId){
            return getCustomerById(customerId)
        },
        getDrillingRigsById(drillingRigId){
            return getDrillingRigsById(drillingRigId)
        },
        loadYear(year){
            this.yearData = []
            getYearData(year).then(result => {
                if(isUndefind(result)){
                    console.log('Информация для выбранного года отсутствует')
                } else {
                    this.yearData = result
                }
            })
        },
        updateTable(){
            this.dialogVisible=false
            this.loadYear(this.selectedYear)
        },
        removeRecord(recordId, index){
            removeRecord(recordId).then( result => {
                if(result){
                     this.yearData.splice(index, 1)
                     this.$alert('Запись удалена', 'Успех', {
                        confirmButtonText: 'OK',
                        callback: () => {
                            
                        }
                    });
                } else {
                     this.$alert('Не удалость удалить запись', 'Ошибка', {
                        confirmButtonText: 'OK',
                        callback: () => {
                            
                        }
                    });
                }
            })
        },
        editRecord(index){
            console.log('Редактирование ', index)
            this.sliceToEdit = this.yearData[index]
            this.dialogVisible = true
        },
        newRecord(){
            this.sliceToEdit = {
                id: 0,
                year: this.selectedYear,
                region: 0,
                customer: 0,
                drilling: 0,
                dataMonth: [
                    {month:1, passage:0},
                    {month:2, passage:0},
                    {month:3, passage:0},
                    {month:4, passage:0},
                    {month:5, passage:0},
                    {month:6, passage:0},
                    {month:7, passage:0},
                    {month:8, passage:0},
                    {month:9, passage:0},
                    {month:10, passage:0},
                    {month:11, passage:0},
                    {month:12, passage:0}
                ]
            }
            this.dialogVisible = true
        }
    },
    computed: {
        allowedYears: function(){
            return getAllowedYears()
        },
        yearDataParsed: function(){
            return this.yearData.map( item => {
                return {
                    id: item.id,
                    region: getRegionById(item.region),
                    customer: getCustomerById(item.customer),
                    drilling: getDrillingRigsById(item.drilling),
                    dataMonth: function(monthToFind){
                        let month = item.dataMonth.find( currentMonth => currentMonth.month == monthToFind)
                        if(isUndefind(month.passage)){
                            return 0
                        } else {
                            return Math.round(month.passage)
                        }
                    },
                    sum: function(){
                        return Math.round(item.dataMonth.reduce((accumulator, currentMonth) => {
                            return accumulator + parseFloat(currentMonth.passage)
                        },0))
                    }
                }
            })
        }
    },
    watch: {
        selectedYear: function(newYear){
            this.loadYear(newYear)
        }
    },
    
}
</script>

<style>



    body {
        padding-top: 40px !Important
    }
    
    h1 {
        font-weight: 700;
        margin: 0 0 24px 0;
    }

    .wrapper {
       padding: 40px
    }

    .selectYear {
        margin: 0 0 32px 0
    }

    .selectYear-button {
        margin-left: 30px !important
    }

    table {
        width: 100%;
        margin: 16px 0 0 0;
    }

        table tr th {
            padding: 12px;
            text-align: center;
            font-weight: 700;
            border: solid 1px #ddd;
        }

        table tr td {
            padding: 12px;
            text-align: center;
            border: solid 1px #ddd;
            font-size: 13px
        }

        table tr:nth-child(odd){
            background: #f5f5f5
        }

        table tr td:last-child {
            font-weight: bold;
            color: blue;
            font-size: 14px
        }

        .alert {
            padding: 15px 0;
            color: red
        }
</style>