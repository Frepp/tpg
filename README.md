The Plane Game
==============

Att installera detta projekt är inte helt simpelt och du bör ha vissa kunskaper i webbprogrammering i allmänhet och php i synnerhet för att
klara av det.

För att kunna använda topplistan krävs en databas, vill du inte använda denna funktion är det ganska enkelt att kommentera, eller ta, bort de delar som rör denna hantering och då kan följande stycke bortses ifrån.

För att kunna använda databasen används ett ramverk kallat Dux. Du kan klona det här: https://github.com/Frepp/dux
De filer du behöver är CDatabase och Bootstrap.php i src-katalogen samt hela themes katalogen. TPG proejektet kolnar du sedan till samma aktalog där du lagt dessa kataloger.

Inställning kan du göra i config.php, där du bland annat behöver specifiera din databas och kan ändra header, meny och footer.  

Övriga frågor hänvisas till utvecklaren på fpeterson94@gmail.com
