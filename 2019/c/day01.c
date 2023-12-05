#include <stdio.h>
#include <stdlib.h>

#include "day01.h"


int main(int argc, char **argv){
    int error = 0;
    if (calculate(12) != 2) error = 1;
    if (calculate(14) != 2) error = 1;
    if (calculate(1969) != 654) error = 1;
    if (calculate(100756) != 33583) error = 1;
    if (calculateFuel(1969) != 966) error = 1;
    if (calculateFuel(100756) != 50346) error = 1;


    parseFile();

    if (error > 0) 
        printf("Error");
    else 
        printf("success");
}

int calculate(int input){
    return (input / 3)-2;
}

int parseFile(){
     size_t len = 0;
    char * line = NULL;
    ssize_t read;
    int lineval = 0;
    int lineint = 0;
    int sum = 0;

    FILE* f = fopen("input01.txt", "r");
    if (f == NULL) 
        exit(EXIT_FAILURE);

    while ((read=getline(&line, &len, f) != -1)){    
        lineint = atoi(line);   
        lineval = calculateFuel(lineint);
        sum += lineval;
        printf("%d->%d: %d\n", lineint, lineval, sum);
    }
    fclose(f);
    if (line)
        free(line);
    exit(EXIT_SUCCESS);
}

int calculateFuel(int input){
    int fuel;
    int mass = input;
    int sum = 0;
    while ((fuel = calculate(mass)) > 0){
        sum += fuel;
        mass = fuel;
    }
    return sum;
}