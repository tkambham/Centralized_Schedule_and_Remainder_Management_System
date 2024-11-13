export class Appointments{
    constructor(data){
        if(!data) return;
        this.appointmentTitle = data.appointmentTitle;
        this.appointmentDate = data.appointmentDate;
        this.appointmentTime = data.appointmentTime;
        this.earlyRemainder = data.earlyRemainder;
        this.appointmentType = data.appointmentType;
        this.appointmentNotes = data.appointmentNotes;
        this.email = data.email;
    }
    set_docId(id){
        this.docId = id;
    }
    toFirestore(){
        return{
            appointmentTitle: this.appointmentTitle,
            appointmentDate: this.appointmentDate,
            appointmentTime: this.appointmentTime,
            earlyRemainder: this.earlyRemainder,
            appointmentType: this.appointmentType,
            appointmentNotes: this.appointmentNotes,
            email: this.email,
        }
    }
}