import {outputs} from './.helloWorld.json'
import './console'

console.render(outputs)

outputs.forEach(output => {
  let {key, data} = output
  console.render({key, data})
})
