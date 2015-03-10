CS4802 - Biovisualization
Assignment 4
Jonathan Wu - jtwu
Sequence Matching

Demo: http://citrus7.github.io/CS4802-BioVisualization/Assignment%204/

For this assignment I compared two portions of the DNA sequence given in the course site. 
I decided to try a different dynamic programming approach from the example given in the assignment.  I iterated through the string and checked 3 possibilities at each index: comparing the values directly, inserting a space in string 1, and inserting a string in string 2.  I then recursively checked those strings before returning the maximum value. For example, when checking ABC against BC I would compare ABC to BC, -ABC to BC, and -BC to ABC.  In the next step I would branch off again and compare ABC to BC, A-BC to BC, ABC to B-C, -ABC to BC, --BC to BC, -ABC to B-C, -BC to ABC, and --BC to A-BC.  Although this would have a runtime of 3^n, the usage of a cache reduced the number of calculations significantly. 
Comparing two strings of length 800 each, this method compared 644,810 cycles, and had 1,286,404 cache hits.  This was about the upper limit of what my computer could handle, and took roughly 6-10 seconds to compute in Firefox.

For visualization I displayed each character on it's own line next to the corresponding character in the second sequence.  Identical characters are shown in a third column.  A zoomed out view of the entire sequence is shown in a preview bar on the right so that users can keep track of their position in the sequence.  



