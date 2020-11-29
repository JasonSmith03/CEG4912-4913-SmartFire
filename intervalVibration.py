import time
import board
from digitalio import DigitalInOut, Direction

# vibrating motor connected on port D2
vibrating_disc = DigitalInOut(board.D1)
vibrating_disc.direction = Direction.OUTPUT

on_time = 2     # Vibration motor run time (seconds)
interval = 60   # Time between reminders (seconds)

start_time = time.monotonic()

while True:

    timer = time.monotonic() - start_time

    if timer >= interval and timer <= (interval + on_time):
        vibrating_disc.value = True

    elif timer >= (interval + on_time):
        vibrating_disc.value = False
        start_time = time.monotonic()
