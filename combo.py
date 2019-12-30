# Python3 program to find combinations from n 
# arrays such that one element from each 
# array is present 

# function to prcombinations that contain 
# one element from each of the given arrays 
def print1(arr): 
	
	# number of arrays 
    n = len(arr) 

	# to keep track of next element 
	# in each of the n arrays 
    indices = [0 for i in range(n)]
    print("indeces",indices) 

    while (1): 

		# prcurrent combination 
        for i in range(n): 
            print(arr[i][indices[i]], end = " ") 
        print() 

		# find the rightmost array that has more 
		# elements left after the current element 
		# in that array 
        next = n - 1
        while (next >= 0 and
            (indices[next] + 1 >= len(arr[next]))): 
            next-=1

		# no such array is found so no more 
		# combinations left 
        if (next < 0): 
            return

		# if found move to next element in that 
		# array 
        indices[next] += 1

		# for all arrays to the right of this 
		# array current index again points to 
		# first element 
        for i in range(next + 1, n): 
            indices[i] = 0

# Driver Code 

# initializing a vector with 3 empty vectors 
arr = [[] for i in range(3)]
print("arr",arr) 

# now entering data 
# [[1, 2, 3], [4], [5, 6]] 
arr[0].append(1) 
arr[0].append(2) 
arr[0].append(3) 
arr[1].append(4) 
arr[2].append(5) 
arr[2].append(6) 

print1(arr) 

# This code is contributed by mohit kumar 
