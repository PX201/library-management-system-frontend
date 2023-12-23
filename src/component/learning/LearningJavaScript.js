
const person = {
    name:'Aiman',
    age:24,
    address:{
        line1: '123 Baker St',
        city:'Auburn',
        zip: 36802,
    },
    profiles : ['facebook', 'instagram', 'linkden'],
    printProfile: () => {
        person.profiles.map(
            (profile) => console.log(profile)
        )
    },
    printPerson: () => {
        console.log(person)
    }
}

export default function NewStuff(){
    return(
        <div>
            name is {person.name}, from {person.address.city} show the profile in {person.profiles[1]}
            <p>ttt ... .{person.printProfile()} {person.age}</p>
        </div>
    )
}