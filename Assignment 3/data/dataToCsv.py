#Jonathan Wu - jtwu
#3-1-2015
#opens zoodata.txt and converts the contents to CSV format


def main():
    #Open zoodata.txt
    f = open('breast-cancer-wisconsin.data','r')
    #Output to a file named zoodata.csv
    write = open('breastCancerData.csv','w')
    write.write("Sample Code Number,Clump Thickness,Uniformity of Cell Size,Uniformity of Cell Shape,Marginal Adhesion,Single Epithelial Cell Size,Bare Nuclei,Bland Chromatin,Normal Nucleoli,Mitoses,Class\n")
    for line in f:
        lineText = ""
        thisLine = line.split(",")
        #extract items 1 through 10
        for i in range(0,10):
            lineText += thisLine[i] + ",";
        #extract benign/malignant
        if int(thisLine[10]) == 2:
            lineText += "Benign"
        else:
            lineText += "Malignant"
        lineText += "\n"
        print(lineText)
        write.write(lineText)

main()

    
