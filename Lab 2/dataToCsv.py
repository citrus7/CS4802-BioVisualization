#Jonathan Wu - jtwu
#1-30-2015
#opens zoodata.txt and converts the contents to CSV format


def main():
    #Open zoodata.txt
    f = open('zoodata.txt','r')
    #Output to a file named zoodata.csv
    write = open('zoodata.csv','w')
    write.write("animal name,hair,feathers,eggs,milk,airborne,aquatic,predator,toothed,backbone,breathes,venomous,fins,legs,tail,domestic,catsize,type\n")
    for line in f:
        lineText = ""
        thisLine = line.split(",")
        #extract animal name
        lineText += thisLine[0] + ",";
        #extract 2. hair through 13. fins
        for i in range(1,13):
            if int(thisLine[i]) == 1:
                lineText += "true" + ","
            else:
                lineText += "false" + ","
        #extract legs
        lineText += thisLine[13] + ","
        #extract 15. tail through 17. catsize
        for i in range(14,17):
            if int(thisLine[i]) == 1:
                lineText += "true" + ","
            else:
                lineText += "false" + ","
        #extract legs
        lineText += thisLine[17]
        print(lineText)
        write.write(lineText)

main()

    
