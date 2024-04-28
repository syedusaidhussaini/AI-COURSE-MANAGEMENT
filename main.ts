#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Teacher{
  static teacherCount: number = 0;

  name: string;
  courses: string[];
  teacherID: string | null = null;
  balance: number;


constructor(name: string){
  this.name = name;
  this.courses = [];
  this.teacherID = this.generateTeacherID();
  this.balance = 0
  Teacher.teacherCount++;
}

private generateTeacherID(): string {
  return Math.floor(1000 + Math.random() * 1500).toString();
}

enrollInCourses(course:string): void {
  this.courses.push(course);
  console.log(`${this.teacherID} is enrolled in this ${course} course :`)
}

viewBalance(): void {
  console.log(`${this.name}'s balance is ${this.balance}`)
}
payFees(amount: number): void{
  this.balance += amount;
  console.log(`${this.name} paidfees of amount ${amount}`)
}

viewStatus() : void {
  console.log(`Teacher name : ${this.name}` )
  console.log(`Teacher ID : ${this.teacherID}` )
  console.log(`Enrolled in this : ${this.courses.join(",")}`)
  console.log(`View Balance : ${this.balance}` )
}

}
class teacherManage{
  teachers: Teacher[];

  constructor(){
    this.teachers = []
  }

  async addTeacher(): Promise <void> {
    const { name } = await inquirer.prompt([{
      name: "name",
      message:chalk.bgBlue("Enter your teacher name :")
    }]);
  
  const newTeacher = new Teacher (name)
  this.teachers.push(newTeacher);
  console.log(`${newTeacher.name} is added with the id ${newTeacher.teacherID}`)
  }

  async enrollTeacherInCourses(): Promise <void> {
    const {teacherID, course} = await inquirer.prompt([{
      name: "teacherID",
      message:chalk.greenBright("Enter your TeacherID :")
    },
  {
    name: "course",
    message:chalk.bgCyanBright("Enter your course name :"),
    type: "list",
    choices: ["Artificial Intelligence","Deep Learning","Machine Learning","Phython courses","Introduction to Artifical Intelligence","Neural networks courses"]
  }]);

  const teacher = this.findTeacherByID(teacherID)
  if (teacher) {
   teacher.enrollInCourses(course);
  } else {
    console.log(chalk.bgRedBright("Course not found :"))
  }
  }

  async payTeacherFees(): Promise <void> {
    const{teacherID, amount} = await inquirer.prompt([{
      name: "teacherID",
      message:chalk.greenBright("Enter your teacherID :")
    },
    {
      name: "amount",
      message:chalk.greenBright("Please select amount 0f AICourse Respectively :\nFor Artificial Intelligence = 2000 \nFor Deep Learning = 5000 \nFor Machine Learning = 3000 \nFor Phython courses = 3000 \nFor Introduction to Artificial Intelligence = 3000 \nFor Neural networks courses = 4000 :"),
      type: "list",
      choices: ["2000","5000","3000","3000","3000","4000"]
    }]);
  const teacher = this.findTeacherByID(teacherID)
  if (teacher) {
    teacher.payFees(Number(amount))
  } else {
    console.log(chalk.bgRedBright("Amount not found :"))

  }
  }

  async viewTeacherBalance(): Promise <void> {
    const {teacherID} = await inquirer.prompt([{
      name: "teacherID",
      message:chalk.greenBright( "Enter your teacher ID :")
    }]);
    const teacher = this.findTeacherByID(teacherID)
    if (teacher) {
      teacher.viewBalance();
    } else {
      console.log(chalk.bgRedBright("Account not found :"))
    }
  }

  async viewTeacherStatus(): Promise <void> {
    const { teacherID } = await inquirer.prompt([{
      name: "teacherID",
      message:chalk.greenBright("Enter your teacherID :")
    }]);
    const teacher = this.findTeacherByID(teacherID)
    if (teacher) {
      teacher.viewStatus()
    } else {
      console.log(chalk.bgRedBright("Status not found:"))
    }
  }
 
 private findTeacherByID(teacherID: string): Teacher | undefined {
  return this.teachers.find((Teacher) => Teacher.teacherID = teacherID);
}
}

async function main () {
  const sms = new teacherManage();

  while (true) {
    const { action} = await inquirer.prompt([{
      name: "action",
      message:chalk.greenBright("Welcome to our AI Courses for Capable Teachers \nPlease select what you want to :"),
      type: "list",
      choices: ["addTeacher","enrollTeacherInCourses","ViewBalance","Payfees","showStatus","Exit"]
    }]);

    switch(action) {
      case "addTeacher":
      await  sms.addTeacher();
      break;

      case "enrollTeacherInCourses":
        await sms.enrollTeacherInCourses();
        break;

      case "ViewBalance":
       await sms.viewTeacherBalance();
       break;
      
      case "Payfees":
        await sms.payTeacherFees();
        break;

      case "showStatus":
        await sms.viewTeacherStatus();
        break;

      case "Exit":
        console.log(chalk.blue("Exit to our AI Course of Capable teachers :"))
        process.exit(0);
    }
  }
}
main();