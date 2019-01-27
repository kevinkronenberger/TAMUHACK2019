import json
import API
my_new_list=[]
my_next_new_list=[]
my_list = API.course_final

for r in range(0,len(my_list)):
    my_new_list.append(my_list[r].split("-"))
my_next_new_list=json.dumps(my_new_list)
print(my_next_new_list)
print(my_new_list)
