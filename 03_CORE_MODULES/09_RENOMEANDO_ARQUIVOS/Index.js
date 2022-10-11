const fs = require('fs')

const oldArq = 'Arq.txt'
const newArq = 'NewArq.txt'

fs.rename(oldArq, newArq, function(err) {

    if(err){
        console.log(err)
        return
    }
    console.log(`O arquivo ${oldArq} foi renomeado para ${newArq}`)
})