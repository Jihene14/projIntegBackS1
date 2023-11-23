import { Op } from "sequelize";
import CalandrierEmp from "../models/CalendrierEmp";

const getEmployeCalendarFromDate = async (employeId: number, date?: Date) => {
  let START;
  let NOW;
  if (date) {
    START = date;
    NOW = date;
  } else {
    START = new Date();
    NOW = new Date();
  }
  START.setHours(0, 0, 0, 0);
  return CalandrierEmp.findOne({
    where: {
      employeId,
      jour: {
        [Op.between]: [START.toISOString(), NOW.toISOString()],
      },
    },
  });
};

const CalandrierEmpService = {
  getAll: () => {
    return CalandrierEmp.findAll();
  },
  getOne: (id: number) => {
    return CalandrierEmp.findByPk(id);
  },
  getOneByDate:async(id: number)=>{
    let now = new Date()
    let todayCalendar = await CalandrierEmp.findAll({ where: { employeId: id } })
    console.log(todayCalendar);

    if (todayCalendar.length != 0) {

      for (let i = 0; i < todayCalendar.length; i++) {
        if ((todayCalendar[i].jour.getDate() == now.getDate()) && (todayCalendar[i].jour.getMonth() == now.getMonth()) && (todayCalendar[i].jour.getFullYear() == now.getFullYear())) {
          todayCalendar[i].heureArriv = new Date()
          await todayCalendar[i].save();
          return todayCalendar[i]
        }
        
      }
      let newDate= new CalandrierEmp()
      newDate.jour=new Date()
      newDate.employeId= id
      await newDate.save();
      return newDate
    }
    let newDate= new CalandrierEmp()
     newDate.jour=new Date()
     newDate.employeId= id
     await newDate.save();
     return newDate
  },
  AjouterHeureArriv: async (id: number, heureArriv: Date) => {
    let now = new Date()
    let todayCalendar = await CalandrierEmp.findAll({ where: { employeId: id } })
    console.log(todayCalendar);

    if (todayCalendar.length != 0) {

      for (let i = 0; i < todayCalendar.length; i++) {
        if ((todayCalendar[i].jour.getDate() == now.getDate()) && (todayCalendar[i].jour.getMonth() == now.getMonth()) && (todayCalendar[i].jour.getFullYear() == now.getFullYear())) {
          todayCalendar[i].heureArriv = new Date()
          await todayCalendar[i].save();
          return todayCalendar[i]
        } else {
          let calToday = new CalandrierEmp()
          calToday.jour = new Date();
          calToday.heureArriv = new Date();
          calToday.employeId = id
          await calToday.save()
          return calToday
        }

      }
    }
    else {
      let calToday = new CalandrierEmp()
      calToday.jour = new Date();
      calToday.heureArriv = new Date();
      calToday.employeId = id
      await calToday.save()
      return calToday
    }

  },

  AjouterHeureDep: async (id: number, heureDep: Date) => {
    let now = new Date()
    let todayCalendar = await CalandrierEmp.findAll({ where: { employeId: id } })
    console.log(todayCalendar);

    if (todayCalendar.length != 0) {

      for (let i = 0; i < todayCalendar.length; i++) {
        if ((todayCalendar[i].jour.getDate() == now.getDate()) && (todayCalendar[i].jour.getMonth() == now.getMonth()) && (todayCalendar[i].jour.getFullYear() == now.getFullYear())) {
          todayCalendar[i].heureDep = new Date()
          console.log(todayCalendar[i].heureDep.getTime());
          
          console.log(((todayCalendar[i].heureDep).getTime() - (todayCalendar[i].heureArriv).getTime() )/3600000);
          if(( (todayCalendar[i].heureDep).getTime() - (todayCalendar[i].heureArriv).getTime() )/3600000 > 8 ){

            todayCalendar[i].heureSup = Math.round(( (todayCalendar[i].heureDep).getTime() - (todayCalendar[i].heureArriv).getTime() )/3600000 - 8)
            
            
          }
          else{
            todayCalendar[i].heureSup=0
            
          }
         
          await todayCalendar[i].save();
          return todayCalendar[i]
        } else {
          return null
        }
      }
    }
    else {
      return null
    }

  },


 

  ModifierHeureCong: async (id: number, heureConge: number) => {
    const todayCalendar = await getEmployeCalendarFromDate(id);
    if (todayCalendar) {
      todayCalendar.heureConge = heureConge;
      todayCalendar.save();
    }
  },

  Suivreperformance: async (employeId: number, date: Date) => {
    const calendarEntry = await getEmployeCalendarFromDate(employeId, date);
    if (!calendarEntry) {
      return 0;
    }
    const performance =
      calendarEntry.heureDep.getHours() -
      calendarEntry.heureArriv.getHours() +
      calendarEntry.heureSup -
      calendarEntry.heureConge;
    return performance;
  },
};

export default CalandrierEmpService;
