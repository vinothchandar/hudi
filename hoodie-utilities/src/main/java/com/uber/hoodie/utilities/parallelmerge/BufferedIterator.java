/*
 *  Copyright (c) 2017 Uber Technologies, Inc. (hoodie-dev-group@uber.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *           http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */

package com.uber.hoodie.utilities.parallelmerge;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.NoSuchElementException;

public class BufferedIterator implements Iterator {

  private Iterator source;
  private int max;
  private LinkedList queue;
  private Object nextReturn;
  private Object done = new Object();


  public BufferedIterator(Iterator src, int m) {
    max = m;
    source = src;
    queue = new LinkedList();
    (new Thread("BufferedIterator Filler") {
      public void run() {
        while (source.hasNext()) {
          Object next = source.next();
          synchronized (queue) {
            while (queue.size() >= max) {
              try {
                queue.wait();
              } catch (InterruptedException doh) {
                doh.printStackTrace();
                return; // something went wrong
              }
            }
            queue.add(next);
            queue.notify();
          }
        }

        synchronized (queue) {
          queue.add(done);
          queue.notify();
        }
      }
    }).start();
  }

  public synchronized boolean hasNext() {

    while (nextReturn == null) {
      synchronized (queue) {
        while (queue.isEmpty()) {
          try {
            System.out.println("Queue empty!!");
            queue.wait();
          } catch (InterruptedException doh) {
            doh.printStackTrace();
            return false; // something went wrong
          }
        }

        nextReturn = queue.removeFirst();
        queue.notify();
        if (nextReturn == done) {
          return false;
        }
      }
    }

    return true;
  }


  public synchronized Object next() {

    if (!hasNext()) {
      throw new NoSuchElementException();
    }

    Object retVal = nextReturn;
    nextReturn = null;
    return retVal;
  }
}
