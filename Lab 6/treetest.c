/** treetest.c 
  *@author Yuchen Guo
  *test program which excerises the add_tnode() function by inderting some strings   */
#include <stdlib.h>
#include <stdio.h>
#include "tree.h"


int main() {
   printf("Create a tree and filling it with strings\n");
   Tnode *tnode = NULL; //Initialze the tree
   Tnode *node1;
   Tnode *node2;
   Tnode *node3;
   Tnode *node4;

   //adding data 
   tnode = add_tnode(tnode, "A");
   tnode = add_tnode(tnode, "B");
   tnode = add_tnode(tnode, "C");
   tnode = add_tnode(tnode, "D");
   printf("Entry a duplicate tree\n");
   node1 = add_tnode(tnode, "D");
   printf("Duplicated trees are not allowed\n");
  
   printf("Print trees in descending order.\n");
   print_tnode(tnode);
   printf("Success!\n");

   //Now free all tree nodes
   free_tnode(tnode);

   return 0;
}
