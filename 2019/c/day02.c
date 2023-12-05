#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "day02.h"

char input[] = "1,0,0,0,99";

int main(int argc, char **argv){
   
   int program[100];
    int count = split_token(input, program);

    for (int i=0;i<count;i++){
        printf("%d,", program[i]);
    }
}

int split_token(char *input, int program[]){
     char *source = input;
    char * token;

    int count = 0;
    token = strtok(input, ",");
    int d = 0;
    while (token){
        d = atoi(token);
        program[count++] = d;
        token = strtok(NULL, ",");        
    }
    return count;
}