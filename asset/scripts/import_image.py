#!/usr/bin/python
# -*- coding: UTF-8 -*-

import Queue
import os;
import random
import shutil
import thread
import time
from PIL import Image

dataDir = "/Users/xuwei/Documents/blueberry/data/"
sourceDir = "/Users/xuwei/xtestw/blueberry-be/blueberry-be-data-generator/output"

id = -1
maxThreads = 50
q = Queue.Queue()
flag = True
def convert():
    while(not q.empty() or flag):
        if(q.empty()):
            time.sleep(1)
            continue
        try:
            data = q.get()
            print data
            baseUrl = data['url']
            index = data['index']
            MAX_SIZE = (720, 720)
            print(baseUrl+"/"+str(index)+".webp")
            im = Image.open(sourceImg)
            im.convert("RGB").save(baseUrl+"/"+str(index)+".webp", "webp")
            im =Image.open(baseUrl+"/"+str(index)+".webp")
            im.thumbnail(MAX_SIZE,Image.ANTIALIAS)
            im.save(baseUrl+"/"+str(index)+"_thumbnail.webp", "webp")
        except Exception as inst:
            print(inst.args)     # arguments stored in .args
            print(inst)

for i in range(50):
    print i
    thread.start_new_thread(convert,())
for path,dir_list,file_list in os.walk(sourceDir):
    id = id + 1
    print(id)
    if (id<209):
        continue
    print("start")
    index = 0
    personDir = dataDir + str(id)
    print(personDir)
    try:
        shutil.rmtree(personDir)
    except:
        print("exception")
    personPubDir = personDir + "/public"
    personPriDir = personDir + "/private"
    pubcnt = 0
    for file_name in file_list:
        i = random.randint(0,1)
        index = index+1
        if not os.path.exists(personDir):
            os.mkdir(personDir)
        if not os.path.exists(personPubDir):
            os.mkdir(personPubDir)
        if not os.path.exists(personPriDir):
            os.mkdir(personPriDir)
        if (file_name.find("DS_Store")>0):
            continue
        sourceImg = os.path.join(path,file_name)
        print(dataDir+str(id)+"/"+str(id)+".json")
        MAX_SIZE = (720, 720)
        if (file_name.find("user")>=0):
            print(dataDir+str(id)+"/"+str(id)+".json")
            shutil.copyfile(os.path.join(path,file_name),dataDir+str(id)+"/"+str(id)+".json")
            print(dataDir+str(id)+"/"+str(id)+".json")
            continue
        try:
            if (i==0 and pubcnt < 8):
                q.put({'url':personPubDir,'index':index})
                # print(personPubDir+"/"+str(index)+".webp")
                #
                # im = Image.open(sourceImg)
                # im.convert("RGB").save(personPubDir+"/"+str(index)+".webp", "webp")
                # im =Image.open(personPubDir+"/"+str(index)+".webp")
                # im.thumbnail(MAX_SIZE)
                # im.save(personPubDir+"/"+str(index)+"_thumbnail.webp", "webp")
                pubcnt = pubcnt+1
                #shutil.copyfile(os.path.join(path,file_name),dataDir+str(id)+"/public/"+str(index)+".jpg")
            else:
                q.put({'url':personPriDir,'index':index})
                # print(personPriDir+"/"+str(index)+".webp")
                # im = Image.open(sourceImg)
                # im.convert("RGB").save(personPriDir+"/"+str(index)+".webp", "webp")
                # im =Image.open(personPriDir+"/"+str(index)+".webp")
                # im.thumbnail(MAX_SIZE,Image.ANTIALIAS)
                # im.save(personPriDir+"/"+str(index)+"_thumbnail.webp", "webp")
        except Exception as inst:
            print(type(inst))    # the exception instance
            print(inst.args)     # arguments stored in .args
            print(inst)
            print(personPubDir)
flag = False
while not q.empty():
    time.sleep(10)
            #shutil.copyfile(os.path.join(path,file_name),dataDir+str(id)+"/private/"+str(index)+".jpg")
        # print i
        # print(os.path.join(path, file_name) )
