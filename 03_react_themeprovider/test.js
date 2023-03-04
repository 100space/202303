const person = {
    name: "baek",
    age: "30",
    key: 180,
    weight: 75,
}

const { name, ...rest } = person
console.log(a) // name을 제외한 모든 값

function a(obj) {
    console.log(obj)
}
a({ ...rest, a: 10 }) // {age, key , weight, a:10}
