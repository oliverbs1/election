creer une base : election2017

CREATE TABLE candidat (     
    id INT PRIMARY KEY NOT NULL,     
    lastname VARCHAR(100),    
    firstname VARCHAR(100),    
    age INT,
    partie VARCHAR(100)
    )
    
 CREATE TABLE votant (     
    id INT PRIMARY KEY NOT NULL,     
    lastname VARCHAR(100),    
    firstname VARCHAR(100),    
    age INT
    )
    
 CREATE TABLE vote (     
    id INT PRIMARY KEY NOT NULL,     
    lastname VARCHAR(100), 
    vote VARCHAR(100)
    )