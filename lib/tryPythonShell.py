import sys
import time

if __name__ == '__main__':
    # .format(sys.argv[-1]))
    print('{ "text": "開始找球", "payload": "START" }')
    time.sleep(5)
    print('{ "text": "找到球了", "payload": "SUCCESS" }')
