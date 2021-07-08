---
layout: page
#sidebar: right
subheadline: "DIY Oxygen Concentrator"
title:  "DIY Oxygen Concentrator Using Hardware Store Parts"
#teaser: ""
breadcrumb: true
tags:
    - mechatronic oxygen concentrator
categories:
    - mechatronic
image:
    #thumb: gallery-example-2-thumb.jpg
    #title: gallery-example-2.jpg
    #caption: Unsplash.com
    #caption_url: http://unsplash.com
---

OxiKit:                        
[![IMAGE ALT TEXT](https://img.youtube.com/vi/8fDJ30SG4NA/0.jpg)](https://www.youtube.com/watch?v=8fDJ30SG4NA)


Maker's Asylum M-19 Initiative:                           
[![IMAGE ALT TEXT](https://img.youtube.com/vi/tobUvesSOzw/0.jpg)](https://www.youtube.com/watch?v=tobUvesSOzw)

OxiKit Oxygen Concentrator Hardware Store Parts:
![IMAGE ALT TEXT](https://github.com/dragon28/dragon28.github.io/raw/gh-pages/images/Bundle_for_Oxikit_BOM.png?raw=true)
![IMAGE ALT TEXT](https://github.com/dragon28/dragon28.github.io/raw/gh-pages/images/OxiKit_Oxygen_Concentrator_Completed_Parts.png?raw=true)

OxiKit Oxygen Concentrator Circuit Diagram:
![IMAGE ALT TEXT](https://github.com/dragon28/dragon28.github.io/raw/gh-pages/images/OxiKit_DIY_Oxygen_Concentrator_Schematics.png?raw=true)

OxiKit Oxygen Concentrator Zeolite Sieve Assembly Diagram:
![IMAGE ALT TEXT](https://github.com/dragon28/dragon28.github.io/raw/gh-pages/images/OxiKit_Oxygen_Concentrator_Zeolite_Sieve_Assembly_Diagram.png?raw=true)

OxiKit Oxygen Concentrator Frame:
![IMAGE ALT TEXT](https://github.com/dragon28/dragon28.github.io/raw/gh-pages/images/OxiKit_Oxygen_Concentrator_Frame.png?raw=true)

OxiKit Oxygen Concentrator Brain:
![IMAGE ALT TEXT](https://github.com/dragon28/dragon28.github.io/raw/gh-pages/images/OxiKit_Oxygen_Concentrator_Brain.png?raw=true)


OxiKit Oxygen Concentrator Arduino Code v2:
```
// Full program for Arduino Uno control of Oxycon Relays and LCD units.
// Edited: 05/11/20
// Author: Robert Danger Byrd
// For Version 5 AKA "Handy Oxy"


// RELAY PIN ASSIGNMENT
//**************************************************************************
int Sieve_A_Valve = 5; //Defined Pin as Variable
int Sieve_B_Valve = 6; //Defined Pin as Variable
int PreCharge_Valve = 7; //Defined Pin as Variable
int Fan = 8; //Defined Pin as Variable

// VARIABLE CREATION
//**************************************************************************
unsigned long Relay_Test_Delay; //delay variable creation
unsigned long Startup_Purge_Delay; //delay variable creation
unsigned long Production_Delay; //delay variable creation
unsigned long Flush_Delay; //delay variable creation
unsigned long PreCharge_Delay; //delay variable creation

//**************************************************************************
void setup()
{


  // STARTUP
  //**************************************************************************
  // Serial Port initialization
  Serial.begin(9600);


  // SET PIN MODE FOR PINS IN PROGRAM
  //**************************************************************************
  pinMode(Sieve_A_Valve, OUTPUT);
  pinMode(Sieve_B_Valve, OUTPUT);
  pinMode(PreCharge_Valve, OUTPUT);
  pinMode(Fan, OUTPUT);


  //  SET DELAY TIMING HERE
  //**************************************************************************
  Relay_Test_Delay = 0;
  Startup_Purge_Delay = 1000;
  Production_Delay = 4000;
  Flush_Delay = 450;
  PreCharge_Delay = 700;

  // VALVE RELAY TEST SEQUENCE
  //**************************************************************************
  Serial.println("Relay Test Sequence");
  digitalWrite(Sieve_A_Valve, HIGH); //Turn on relay
  delay(Relay_Test_Delay);
  digitalWrite(Sieve_B_Valve, HIGH); //Turn on relay
  delay(Relay_Test_Delay);
  digitalWrite(PreCharge_Valve, HIGH); //Turn on relay
  delay(Relay_Test_Delay);
  Serial.println("Valve Relay Test Sequence Complete");
  delay(Relay_Test_Delay);


  // STARTUP PURGE
  //**************************************************************************
  Serial.println("Relay Test Sequence");
  digitalWrite(Sieve_A_Valve, HIGH); //Turn on relay
  digitalWrite(Sieve_B_Valve, HIGH); //Turn on relay
  digitalWrite(PreCharge_Valve, HIGH); //Turn on relay
  delay(Startup_Purge_Delay);


  // FAN CONTROL
  //**************************************************************************
  Serial.println("Program Starting...");
  delay(Relay_Test_Delay);
  digitalWrite(Fan, HIGH);
  Serial.println("Fan Switched On");
}

void loop()
{

  //CYCLE 1
  //**************************************************************************
  Serial.println("Sieve A Charge / Sieve B Purge");
  digitalWrite(Sieve_A_Valve, HIGH);
  digitalWrite(Sieve_B_Valve, LOW);
  digitalWrite(PreCharge_Valve, LOW);
  delay(Production_Delay);


  //CYCLE 2
  //**************************************************************************
  Serial.println("Sieve A Charge / Sieve B Purge / Flush/PreCharge");
  digitalWrite(Sieve_A_Valve, HIGH);
  digitalWrite(Sieve_B_Valve, LOW);
  digitalWrite(PreCharge_Valve, HIGH);
  delay(Flush_Delay) ;


  //CYCLE 3
  //**************************************************************************
  Serial.println("Sieve A Charge / Sieve B Charge / Flush/PreCharge");
  digitalWrite(Sieve_A_Valve, HIGH);
  digitalWrite(Sieve_B_Valve, HIGH);
  digitalWrite(PreCharge_Valve, HIGH);
  delay(PreCharge_Delay);

  //CYCLE 4
  //**************************************************************************
  Serial.println("Sieve A Purge / Sieve B Charge");
  digitalWrite(Sieve_A_Valve, LOW);
  digitalWrite(Sieve_B_Valve, HIGH);
  digitalWrite(PreCharge_Valve, LOW);
  delay(Production_Delay);

  //CYCLE 5
  //**************************************************************************
  Serial.println("Sieve A Purge / Sieve B Charge / Flush/PreCharge");
  digitalWrite(Sieve_A_Valve, LOW);
  digitalWrite(Sieve_B_Valve, HIGH);
  digitalWrite(PreCharge_Valve, HIGH);
  delay(Flush_Delay);


  //CYCLE 6
  //**************************************************************************
  Serial.println("Sieve A Charge / Sieve B Charge / Flush/PreCharge");
  digitalWrite(Sieve_A_Valve, HIGH);
  digitalWrite(Sieve_B_Valve, HIGH);
  digitalWrite(PreCharge_Valve, HIGH);
  delay(PreCharge_Delay) ;

}
```


You may refer to 

[OxiKit Oxygen Concentrator](https://hackaday.io/project/178334-oxikit-oxygen-concentrator)

or

[Maker's Asylum M-19 o2 Oxygen Concentrator](https://www.makersasylum.com/m19o2/)

for more information and details on how to build the oxygen concentrator.

On the other hand, you may also refer to the 2 repositories below for more information:

1. [oxygen-concentrator-how-to-diy-open-source](https://github.com/dragon28/oxygen-concentrator-how-to-diy-open-source)

2. [M19_OxiKit](https://github.com/dragon28/M19_OxiKit)

Source(s):

1. [A Simple But Effective High-Flow Oxygen Concentrator From Hardware Store Parts](https://hackaday.com/2021/03/24/a-simple-but-effective-high-flow-oxygen-concentrator-from-hardware-store-parts/)

2. [OxiKit Oxygen Concentrator](https://hackaday.io/project/178334-oxikit-oxygen-concentrator)

3. [OxiKit](https://oxikit.com/)

4. [Maker's Asylum M-19 Initiative](https://www.makersasylum.com/m19-initiative/)

Reference(s):

1. [A Simple But Effective High-Flow Oxygen Concentrator From Hardware Store Parts](https://hackaday.com/2021/03/24/a-simple-but-effective-high-flow-oxygen-concentrator-from-hardware-store-parts/)

2. [Building An Oxygen Concentrator It Isnt Rocket Science](https://hackaday.com/2021/05/10/building-an-oxygen-concentrator-it-isnt-rocket-science/)


## Mechatronic
{: .t60 }
{% include list-posts tag='mechatronic' %}
