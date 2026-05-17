# Operating Systems Interview Prep Syllabus

## Purpose

This syllabus is designed for a daily Operating Systems interview-preparation automation.

Each day should generate:

- **40 minutes of fresh learning**
- **5 minutes of compressed revision**
- Diagrams where useful
- Practical OS/system examples
- Interview questions
- Follow-up questions
- Trick questions
- Common misconceptions
- Final recap

The syllabus is intentionally ordered so that every topic builds naturally on previous topics.

---

## Study Flow

```txt
OS Foundations
→ Processes
→ Scheduling
→ Threads and Concurrency
→ Synchronization
→ Deadlocks
→ Memory Management
→ Virtual Memory
→ File Systems
→ I/O Systems
→ Protection and Security
→ Virtualization and Containers
→ Linux Practical OS Skills
→ Grand Revision
```

---

## Revision Rule

Every generated article should include a **5-minute revision column**.

### Normal Daily Revision

Revise:

- Previous day’s topic
- Topic from 3 days ago, if available

### Every 5th Day

Revise:

- Day -1
- Day -3
- Day -5

### Every 12th Day

Revise:

- Day -1
- Day -3
- Day -5
- Day -12

### Every 20th Day

Revise:

- Day -1
- Day -3
- Day -5
- Day -12
- Day -20

The revision section should stay short, sharp, and interview-oriented.

---

# Module 1 — OS Foundations

## Day 1 — What is an Operating System?

### Core Topics

- Operating System as a resource manager
- Operating System as an abstraction layer
- Goals of an OS
- User view vs system view
- Kernel basics
- Why an OS is needed
- OS responsibilities

### Practical Angles

- What happens when you open an application?
- Why programs cannot directly control hardware
- Why multiple apps can run at the same time

### Important Detours

- System software vs application software
- Kernel vs complete operating system
- Bare metal vs OS-managed execution

### Diagrams to Include

- User → Application → OS → Hardware stack
- OS as resource manager diagram

### Interview Focus

- Define Operating System
- Why is an OS needed?
- Kernel vs OS
- What are OS services?
- What does the OS abstract?

### Common Traps

- Saying OS is only a user interface
- Confusing kernel with shell
- Assuming applications directly access hardware

---

## Day 2 — Computer System Architecture for OS

### Core Topics

- CPU
- Main memory
- I/O devices
- Device controllers
- Interrupts
- Polling
- DMA
- Storage hierarchy
- Bootstrap process

### Practical Angles

- What happens when a key is pressed?
- Why interrupts are better than constant polling
- Why DMA improves performance

### Important Detours

- Interrupt-driven I/O
- CPU-memory-device interaction
- Firmware, BIOS, and UEFI overview

### Diagrams to Include

- CPU-memory-I/O architecture
- Interrupt handling flow

### Interview Focus

- Interrupt vs polling
- What is DMA?
- What happens during boot?
- Why are device controllers needed?

### Common Traps

- Thinking CPU handles all I/O byte-by-byte
- Confusing interrupt with system call
- Treating memory and storage as the same thing

---

## Day 3 — Kernel, User Mode, and System Calls

### Core Topics

- User mode
- Kernel mode
- Privileged instructions
- System calls
- Mode switch
- Trap instruction
- Protection boundary
- API vs system call

### Practical Angles

- Why `printf` may eventually need a system call
- Why file read/write requires OS involvement
- Why system calls are slower than normal function calls

### Important Detours

- Library function vs system call
- CPU privilege levels
- Why direct hardware access is dangerous

### Diagrams to Include

- User mode to kernel mode transition
- System call flow

### Interview Focus

- User mode vs kernel mode
- System call vs function call
- Why privileged mode exists
- What happens during a system call?

### Common Traps

- Saying every function call is a system call
- Thinking kernel mode means a different CPU
- Ignoring the cost of mode switching

---

## Day 4 — OS Structures and Services

### Core Topics

- OS services
- Monolithic kernel
- Microkernel
- Layered OS
- Modular kernel
- Hybrid kernel
- Virtual machine overview

### Practical Angles

- Why Linux is usually called monolithic but modular
- Why microkernels sound clean but can have overhead
- Why OS structure affects reliability and performance

### Important Detours

- Kernel modules
- Driver placement
- Tradeoff between performance and isolation

### Diagrams to Include

- Monolithic vs microkernel structure
- Layered OS architecture

### Interview Focus

- Monolithic vs microkernel
- What services does an OS provide?
- Why does OS structure matter?
- What are kernel modules?

### Common Traps

- Saying microkernel is always better
- Ignoring communication overhead
- Confusing modular kernel with microkernel

---

# Module 2 — Processes and Scheduling

## Day 5 — Program vs Process

### Core Topics

- Program
- Process
- Process image
- Address space
- Text, data, heap, and stack
- Process Control Block
- Process metadata

### Practical Angles

- What happens when you run an executable?
- Why the same program can have multiple processes
- Why each process needs its own address space

### Important Detours

- Static program vs running instance
- Process isolation
- Memory layout of a process

### Diagrams to Include

- Program stored on disk vs process in memory
- Process address space layout

### Interview Focus

- Program vs process
- What is PCB?
- What is process address space?
- What is stored in PCB?

### Common Traps

- Treating program and process as identical
- Forgetting that multiple processes can run the same program
- Ignoring process metadata

---

## Day 6 — Process States and Process Lifecycle

### Core Topics

- New state
- Ready state
- Running state
- Waiting or blocked state
- Terminated state
- Suspended states
- State transitions
- Ready queue
- Waiting queue

### Practical Angles

- Why a process waits for I/O
- What process states mean in Task Manager or `top`
- Why ready and waiting are different

### Important Detours

- CPU-bound vs I/O-bound processes
- Scheduler role in state transitions
- Blocked process vs sleeping process

### Diagrams to Include

- Process state transition diagram
- Ready queue and waiting queue diagram

### Interview Focus

- Process state diagram
- Ready vs waiting
- Running vs ready
- Why does a process get blocked?

### Common Traps

- Saying waiting process is waiting for CPU
- Confusing ready and running
- Ignoring I/O waits

---

## Day 7 — Context Switching

### Core Topics

- Process context
- CPU registers
- Program counter
- Stack pointer
- PCB role
- Save and restore mechanism
- Context switch overhead
- Process vs thread context switch

### Practical Angles

- How multitasking illusion is created
- Why too many processes can slow the system
- Why context switching is necessary for preemption

### Important Detours

- Timer interrupt
- Dispatcher
- Cache and TLB effects
- Voluntary vs involuntary context switch

### Diagrams to Include

- Context switch timeline
- PCB save/restore flow

### Interview Focus

- What is context switching?
- What gets saved during a context switch?
- Why is context switching costly?
- Process context switch vs thread context switch

### Common Traps

- Saying context switching is free
- Forgetting cache/TLB impact
- Confusing mode switch and context switch

---

## Day 8 — Process Scheduling Basics

### Core Topics

- CPU scheduler
- Dispatcher
- CPU burst
- I/O burst
- Scheduling criteria
- CPU utilization
- Throughput
- Turnaround time
- Waiting time
- Response time
- Preemptive scheduling
- Non-preemptive scheduling

### Practical Angles

- Why interactive apps need responsiveness
- Why servers care about throughput
- Why scheduling affects user experience

### Important Detours

- Short-term, medium-term, and long-term schedulers
- Dispatcher latency
- Scheduling tradeoffs

### Diagrams to Include

- CPU burst and I/O burst cycle
- Scheduler and dispatcher flow

### Interview Focus

- Scheduler vs dispatcher
- Preemptive vs non-preemptive scheduling
- Scheduling criteria
- Response time vs turnaround time

### Common Traps

- Confusing waiting time and response time
- Saying one scheduling algorithm is always best
- Ignoring workload differences

---

## Day 9 — Scheduling Algorithms Part 1

### Core Topics

- First Come First Serve
- Shortest Job First
- Shortest Remaining Time First
- Priority scheduling
- Starvation
- Aging
- Convoy effect

### Practical Angles

- Why FCFS can be unfair
- Why SJF is optimal in theory but hard in practice
- Why priority scheduling can cause starvation

### Important Detours

- Predicting CPU burst
- Preemptive vs non-preemptive variants
- Aging as starvation solution

### Diagrams to Include

- Gantt chart examples
- Convoy effect visualization

### Interview Focus

- FCFS vs SJF
- SJF vs SRTF
- Priority scheduling
- Starvation and aging
- Scheduling metric calculations

### Common Traps

- Forgetting SJF needs burst-time prediction
- Confusing SJF and SRTF
- Ignoring starvation in priority scheduling

---

## Day 10 — Scheduling Algorithms Part 2

### Core Topics

- Round Robin
- Time quantum
- Multilevel Queue Scheduling
- Multilevel Feedback Queue
- Response time
- Waiting time
- Turnaround time
- Throughput tradeoffs

### Practical Angles

- Why time quantum size matters
- Why Round Robin works well for time-sharing
- Why modern OS schedulers are more complex

### Important Detours

- Too small quantum vs too large quantum
- Interactive vs batch workloads
- MLFQ intuition

### Diagrams to Include

- Round Robin Gantt chart
- MLFQ queue movement diagram

### Interview Focus

- Round Robin tradeoffs
- Time quantum selection
- Multilevel Queue vs MLFQ
- Calculate scheduling metrics

### Common Traps

- Saying smaller quantum is always better
- Confusing Multilevel Queue and MLFQ
- Forgetting context switch overhead

---

# Module 3 — Threads and Concurrency

## Day 11 — Threads Basics

### Core Topics

- Thread definition
- Single-threaded process
- Multithreaded process
- Thread Control Block
- Shared address space
- Per-thread stack
- User-level threads
- Kernel-level threads

### Practical Angles

- Browser tabs and workers
- Web server request handling
- Why threads are lighter than processes

### Important Detours

- What threads share and what they do not share
- Thread switching vs process switching
- Thread safety preview

### Diagrams to Include

- Process with multiple threads
- Process vs thread memory sharing

### Interview Focus

- Process vs thread
- Why use threads?
- User-level vs kernel-level threads
- What resources do threads share?

### Common Traps

- Saying threads have separate address spaces
- Saying threads are always faster
- Ignoring synchronization needs

---

## Day 12 — Multithreading Models and Concurrency vs Parallelism

### Core Topics

- Many-to-one model
- One-to-one model
- Many-to-many model
- Thread pools
- Concurrency
- Parallelism
- Hyperthreading distinction

### Practical Angles

- Web server thread pools
- UI thread and background worker
- Why concurrency can happen on one core

### Important Detours

- Parallelism requires multiple execution units
- Thread pools vs creating unlimited threads
- User-level scheduling limitations

### Diagrams to Include

- Multithreading model comparison
- Concurrency vs parallelism timeline

### Interview Focus

- Concurrency vs parallelism
- Thread pool
- Many-to-one vs one-to-one
- Why not create a new thread for every task?

### Common Traps

- Treating concurrency and parallelism as identical
- Confusing OS thread with CPU hyperthread
- Ignoring overhead of too many threads

---

## Day 13 — Race Conditions and Critical Sections

### Core Topics

- Shared data
- Race condition
- Critical section
- Atomicity
- Interleaving
- Lost update problem
- Critical section requirements

### Practical Angles

- Bank account withdrawal bug
- Counter increment bug
- Shared variable in multithreaded program

### Important Detours

- Read-modify-write operations
- Mutual exclusion
- Progress and bounded waiting

### Diagrams to Include

- Interleaving timeline
- Critical section entry/exit flow

### Interview Focus

- What is a race condition?
- What is a critical section?
- Why is `count++` not always atomic?
- Critical section problem requirements

### Common Traps

- Thinking single-line code is always atomic
- Confusing race condition with deadlock
- Ignoring possible instruction interleavings

---

## Day 14 — Mutex, Locks, and Semaphores

### Core Topics

- Mutex
- Lock acquire/release
- Binary semaphore
- Counting semaphore
- Blocking locks
- Spinlocks
- Ownership
- Atomic test-and-set idea

### Practical Angles

- Bathroom key analogy
- Database connection pool
- Producer-consumer preview
- Why spinlocks can be useful in kernels

### Important Detours

- Mutex vs binary semaphore
- Sleeping vs spinning
- Lock granularity

### Diagrams to Include

- Mutex-protected critical section
- Counting semaphore resource pool

### Interview Focus

- Mutex vs semaphore
- Binary vs counting semaphore
- When to use semaphore?
- Why can spinlocks waste CPU?

### Common Traps

- Saying mutex and semaphore are always interchangeable
- Ignoring ownership in mutex
- Using spinlock for long waits

---

## Day 15 — Classical Synchronization Problems

### Core Topics

- Producer-consumer problem
- Bounded buffer
- Readers-writers problem
- Dining philosophers problem
- Sleeping barber overview
- Synchronization design patterns

### Practical Angles

- Logging queues
- Message queues
- Shared database reads
- Thread-safe buffers

### Important Detours

- Deadlock possibility
- Starvation possibility
- Fairness tradeoffs

### Diagrams to Include

- Producer-consumer bounded buffer
- Dining philosophers resource graph

### Interview Focus

- Explain producer-consumer
- Readers-writers variants
- Dining philosophers deadlock
- Bounded buffer synchronization

### Common Traps

- Ignoring buffer full/empty conditions
- Forgetting starvation in readers-writers
- Solving dining philosophers with unsafe lock order

---

## Day 16 — Monitors and Condition Variables

### Core Topics

- Monitor
- Condition variable
- Wait
- Signal
- Broadcast
- Mesa vs Hoare monitor basics
- Spurious wakeups
- Wait inside while loop

### Practical Angles

- Java synchronized methods
- Producer-consumer with condition variables
- Why condition variables are not simple booleans

### Important Detours

- Condition variable vs semaphore
- Lock release during wait
- Rechecking condition after wakeup

### Diagrams to Include

- Monitor structure
- Wait-signal sequence diagram

### Interview Focus

- Monitor vs semaphore
- What is a condition variable?
- Why should wait be inside a loop?
- What is a spurious wakeup?

### Common Traps

- Using `if` instead of `while` around wait
- Thinking signal stores a future notification
- Confusing condition variable with lock

---

## Day 17 — Deadlocks Part 1: Concepts and Conditions

### Core Topics

- Deadlock definition
- Resource
- Resource instance
- Four Coffman conditions
- Mutual exclusion
- Hold and wait
- No preemption
- Circular wait
- Resource Allocation Graph

### Practical Angles

- File locks
- Database locks
- Two threads waiting for each other
- Traffic jam analogy

### Important Detours

- Deadlock vs starvation
- Deadlock vs livelock
- Single instance vs multiple instance resources

### Diagrams to Include

- Resource Allocation Graph
- Circular wait diagram

### Interview Focus

- Four necessary deadlock conditions
- Deadlock vs starvation
- Resource allocation graph
- Can deadlock happen without circular wait?

### Common Traps

- Confusing deadlock with slow execution
- Confusing starvation with deadlock
- Forgetting all four conditions must hold

---

## Day 18 — Deadlocks Part 2: Handling Deadlocks

### Core Topics

- Deadlock prevention
- Deadlock avoidance
- Deadlock detection
- Deadlock recovery
- Banker’s Algorithm
- Safe state
- Unsafe state

### Practical Angles

- Why prevention may reduce performance
- Why databases may use detection and recovery
- Why OSes may ignore some deadlocks

### Important Detours

- Prevention vs avoidance
- Safe vs unsafe vs deadlocked state
- Recovery by killing process or preempting resource

### Diagrams to Include

- Deadlock handling strategies map
- Banker’s Algorithm safe sequence flow

### Interview Focus

- Prevention vs avoidance
- Banker’s Algorithm
- Safe state
- Detection and recovery
- Why deadlock handling has tradeoffs

### Common Traps

- Saying unsafe state always means deadlock
- Confusing prevention and avoidance
- Forgetting resource preemption may be impossible

---

# Module 4 — Memory Management

## Day 19 — Memory Management Basics

### Core Topics

- Logical address
- Physical address
- Address binding
- Compile-time binding
- Load-time binding
- Execution-time binding
- MMU
- Relocation
- Base and limit registers
- Protection

### Practical Angles

- Why processes think they own memory
- Why direct physical memory access is dangerous
- Why address translation is needed

### Important Detours

- Memory protection
- Relocatable code
- Address spaces

### Diagrams to Include

- Logical to physical address translation
- Base-limit protection diagram

### Interview Focus

- Logical vs physical address
- What is MMU?
- Address binding types
- Why memory protection is needed

### Common Traps

- Treating logical and physical addresses as same
- Forgetting hardware support from MMU
- Ignoring memory protection

---

## Day 20 — Contiguous Memory Allocation

### Core Topics

- Contiguous allocation
- Fixed partitions
- Variable partitions
- Internal fragmentation
- External fragmentation
- Compaction
- First fit
- Best fit
- Worst fit

### Practical Angles

- Why fragmentation wastes memory
- How allocation strategies affect space usage
- Why compaction can be expensive

### Important Detours

- Dynamic storage allocation problem
- Fragmentation examples
- Relocation support for compaction

### Diagrams to Include

- Memory holes and allocated blocks
- First fit vs best fit vs worst fit example

### Interview Focus

- Internal vs external fragmentation
- First fit, best fit, worst fit
- What is compaction?
- Why contiguous allocation is limited

### Common Traps

- Confusing internal and external fragmentation
- Saying best fit is always best
- Ignoring compaction cost

---

## Day 21 — Paging Basics

### Core Topics

- Paging
- Page
- Frame
- Page table
- Page number
- Offset
- Address translation
- Page table entry
- Valid-invalid bit intro

### Practical Angles

- Why paging removes external fragmentation
- How a virtual address is split
- Why page tables are needed

### Important Detours

- Page size tradeoffs
- Internal fragmentation in paging
- Hardware support for paging

### Diagrams to Include

- Virtual address split into page number and offset
- Page table mapping pages to frames

### Interview Focus

- What is paging?
- Page vs frame
- Address translation numericals
- Does paging remove all fragmentation?

### Common Traps

- Saying paging has no fragmentation at all
- Confusing page and frame
- Forgetting offset remains unchanged

---

## Day 22 — Translation Lookaside Buffer

### Core Topics

- TLB
- Associative lookup
- TLB hit
- TLB miss
- Effective Access Time
- Hit ratio
- TLB flush
- ASID concept

### Practical Angles

- Why address translation needs caching
- Why TLB matters for performance
- Why context switches can affect TLB

### Important Detours

- TLB reach
- Memory access overhead without TLB
- TLB and page table relationship

### Diagrams to Include

- Address translation with TLB
- TLB hit/miss flow

### Interview Focus

- What is TLB?
- TLB hit vs miss
- Effective Access Time calculation
- Why context switch affects TLB

### Common Traps

- Treating TLB as main memory
- Forgetting page table lookup overhead
- Ignoring TLB miss penalty

---

## Day 23 — Multi-Level Page Tables

### Core Topics

- Large page tables
- Hierarchical paging
- Two-level page table
- Multi-level page table
- Inverted page table
- Hashed page table
- Page table memory overhead

### Practical Angles

- Why 64-bit address spaces need smarter paging
- Why not keep one huge page table for every process
- How multi-level paging saves memory

### Important Detours

- Sparse address spaces
- Page table size numericals
- Tradeoff between memory saving and lookup cost

### Diagrams to Include

- Two-level page table lookup
- Single-level vs multi-level page table memory comparison

### Interview Focus

- Why multi-level paging?
- How two-level paging works
- Inverted page table
- Page table size calculations

### Common Traps

- Saying multi-level paging always makes lookup faster
- Ignoring sparse address spaces
- Confusing inverted page table with multi-level page table

---

## Day 24 — Segmentation

### Core Topics

- Segment
- Segment table
- Base and limit
- Logical address as segment number plus offset
- Protection
- Sharing
- Fragmentation in segmentation

### Practical Angles

- Code segment, data segment, stack segment
- Why segmentation matches programmer view
- Why segmentation can protect logical parts of program

### Important Detours

- Segmentation with paging
- Segment-level protection
- External fragmentation issue

### Diagrams to Include

- Segment table address translation
- Paging vs segmentation comparison

### Interview Focus

- Paging vs segmentation
- What is segment table?
- Why segmentation causes external fragmentation
- How protection works in segmentation

### Common Traps

- Confusing segment with page
- Saying segmentation removes external fragmentation
- Ignoring programmer-visible logical divisions

---

## Day 25 — Virtual Memory and Demand Paging

### Core Topics

- Virtual memory
- Demand paging
- Lazy loading
- Swap space
- Page fault
- Page fault handling
- Valid-invalid bit
- Copy-on-write overview

### Practical Angles

- Why apps can use more memory than available RAM
- Why page fault is not always a crash
- Why program startup can be faster with demand paging

### Important Detours

- Locality of reference
- Swap in and swap out
- Minor vs major page fault overview

### Diagrams to Include

- Page fault handling flow
- Virtual memory to disk/RAM mapping

### Interview Focus

- What is virtual memory?
- What is demand paging?
- What happens during a page fault?
- Why is virtual memory useful?

### Common Traps

- Saying page fault always means program crash
- Thinking virtual memory means infinite memory
- Forgetting disk access cost

---

## Day 26 — Page Replacement Algorithms

### Core Topics

- Need for page replacement
- FIFO
- Optimal replacement
- LRU
- Second chance
- Clock algorithm
- Belady’s anomaly
- Reference bit
- Dirty bit

### Practical Angles

- Why OS cannot implement true optimal replacement
- Why LRU is approximated
- Why dirty pages are more expensive to evict

### Important Detours

- Stack algorithms
- Page replacement numericals
- Replacement policy tradeoffs

### Diagrams to Include

- Page reference string example
- Clock algorithm circular pointer diagram

### Interview Focus

- FIFO vs LRU vs Optimal
- Belady’s anomaly
- Clock algorithm
- Page fault calculation

### Common Traps

- Saying FIFO is always improved by more frames
- Forgetting dirty bit write-back cost
- Assuming true LRU is always cheap

---

## Day 27 — Thrashing and Working Set

### Core Topics

- Thrashing
- Working set
- Locality
- Page Fault Frequency
- Degree of multiprogramming
- Local replacement
- Global replacement

### Practical Angles

- Why opening too many heavy apps slows everything
- Why CPU utilization can drop when memory pressure rises
- Why adding more processes can hurt throughput

### Important Detours

- Working set window
- Memory pressure
- Swap storm

### Diagrams to Include

- CPU utilization vs degree of multiprogramming
- Working set over time

### Interview Focus

- What is thrashing?
- What is working set?
- How to control thrashing?
- Local vs global replacement

### Common Traps

- Thinking high CPU usage causes thrashing
- Ignoring page fault frequency
- Confusing normal paging with thrashing

---

# Module 5 — File Systems and Storage

## Day 28 — File System Basics

### Core Topics

- File
- Directory
- File metadata
- File operations
- File attributes
- File descriptor
- Open file table
- Access methods

### Practical Angles

- What happens when a file is opened?
- Why file descriptors are integers
- Why OS manages file metadata

### Important Detours

- Sequential vs direct access
- File abstraction
- Per-process file descriptor table

### Diagrams to Include

- File open flow
- Process file descriptor table to system open file table

### Interview Focus

- What is a file system?
- What is a file descriptor?
- What metadata does a file have?
- What happens during file open?

### Common Traps

- Treating filename as the file itself
- Confusing file descriptor with file pointer
- Ignoring kernel-maintained open file tables

---

## Day 29 — Directory Structures and File Allocation

### Core Topics

- Single-level directory
- Two-level directory
- Tree directory
- Acyclic graph directory
- General graph directory
- Contiguous allocation
- Linked allocation
- Indexed allocation

### Practical Angles

- Why directories organize namespace
- How large files are tracked
- Why contiguous allocation can suffer fragmentation

### Important Detours

- File sharing through links
- Allocation method tradeoffs
- Random access vs sequential access

### Diagrams to Include

- Directory tree
- Contiguous vs linked vs indexed allocation

### Interview Focus

- Directory structures
- File allocation methods
- Indexed allocation advantages
- Contiguous allocation drawbacks

### Common Traps

- Saying linked allocation supports efficient random access
- Forgetting external fragmentation in contiguous allocation
- Ignoring index block overhead

---

## Day 30 — Inodes and Unix File System Ideas

### Core Topics

- Inode
- Inode number
- Data blocks
- Direct pointers
- Single indirect pointer
- Double indirect pointer
- Triple indirect pointer
- Hard links
- Symbolic links

### Practical Angles

- Why deleting a filename may not delete file data immediately
- Why hard links share inode
- Why symbolic links can break

### Important Detours

- File name vs inode
- Link count
- Directory entry
- Unix philosophy around files

### Diagrams to Include

- Inode pointer structure
- Hard link vs symbolic link diagram

### Interview Focus

- What is inode?
- Hard link vs soft link
- What happens when a file is deleted?
- Why inode does not store filename directly?

### Common Traps

- Thinking inode stores file name
- Confusing hard link and soft link
- Assuming delete always immediately removes data blocks

---

## Day 31 — Disk Scheduling

### Core Topics

- HDD basics
- Seek time
- Rotational latency
- Transfer time
- FCFS disk scheduling
- SSTF
- SCAN
- C-SCAN
- LOOK
- C-LOOK

### Practical Angles

- Why disk scheduling mattered for HDDs
- How SSDs change the relevance
- Why minimizing head movement mattered

### Important Detours

- Disk arm movement
- Starvation in SSTF
- Fairness vs performance

### Diagrams to Include

- Disk head movement timeline
- SCAN vs C-SCAN movement diagram

### Interview Focus

- Disk scheduling algorithms
- Seek time
- SSTF starvation
- SCAN vs C-SCAN
- HDD vs SSD relevance

### Common Traps

- Applying HDD assumptions blindly to SSD
- Saying SSTF is always best
- Confusing LOOK and SCAN

---

## Day 32 — I/O Systems

### Core Topics

- I/O hardware
- Device drivers
- Blocking I/O
- Non-blocking I/O
- Interrupt-driven I/O
- DMA
- Buffering
- Caching
- Spooling

### Practical Angles

- Keyboard input
- Printer spooling
- Network I/O
- Why device drivers are necessary

### Important Detours

- Buffering vs caching
- Kernel I/O subsystem
- Synchronous vs asynchronous I/O preview

### Diagrams to Include

- I/O request flow
- DMA transfer flow

### Interview Focus

- Blocking vs non-blocking I/O
- What is DMA?
- Buffering vs caching vs spooling
- Why drivers are needed

### Common Traps

- Confusing buffering, caching, and spooling
- Saying non-blocking I/O means faster execution always
- Ignoring interrupt overhead

---

# Module 6 — Protection, Virtualization, and Practical OS Skills

## Day 33 — Protection and Security Basics

### Core Topics

- Protection
- Security
- Authentication
- Authorization
- Access control
- Access Control Lists
- Capability lists
- Least privilege
- Protection domains

### Practical Angles

- File permissions
- App sandboxing
- Why root/admin access is dangerous
- Why least privilege matters

### Important Detours

- Protection vs security
- ACL vs capability list
- Privilege escalation idea

### Diagrams to Include

- Access matrix
- ACL vs capability list representation

### Interview Focus

- Protection vs security
- Authentication vs authorization
- ACL vs capability list
- Principle of least privilege

### Common Traps

- Confusing authentication and authorization
- Saying protection and security are identical
- Ignoring privilege boundaries

---

## Day 34 — Virtualization

### Core Topics

- Virtual machine
- Hypervisor
- Type 1 hypervisor
- Type 2 hypervisor
- Full virtualization
- Para-virtualization
- Hardware-assisted virtualization
- Virtualization overhead

### Practical Angles

- VirtualBox vs VMware vs cloud VMs
- Why virtualization powers cloud computing
- Why VMs are heavier than containers

### Important Detours

- Guest OS vs host OS
- Trap and emulate
- Isolation benefits

### Diagrams to Include

- Type 1 vs Type 2 hypervisor
- VM stack diagram

### Interview Focus

- VM vs physical machine
- Type 1 vs Type 2 hypervisor
- Full virtualization vs para-virtualization
- Why virtualization has overhead

### Common Traps

- Confusing VM with container
- Saying VM has no overhead
- Ignoring guest OS requirement

---

## Day 35 — Containers and OS-Level Virtualization

### Core Topics

- Container
- Image
- Namespaces
- cgroups
- Union file system overview
- Container runtime
- Container vs VM
- Isolation limits

### Practical Angles

- Docker intuition
- Why containers start faster than VMs
- Why containers are useful for deployment

### Important Detours

- Process isolation
- Resource limits
- Shared kernel model
- Security limitations

### Diagrams to Include

- Container vs VM architecture
- Namespace and cgroup isolation diagram

### Interview Focus

- Container vs VM
- What are namespaces?
- What are cgroups?
- Why containers are lightweight?

### Common Traps

- Saying containers are mini VMs
- Forgetting containers share host kernel
- Assuming container isolation is perfect

---

## Day 36 — Linux Process and Memory Commands

### Core Topics

- `ps`
- `top`
- `htop`
- `free`
- `vmstat`
- `pmap`
- `strace`
- `kill`
- `nice`
- `renice`
- `/proc` filesystem

### Practical Angles

- Observing process states
- Observing memory usage
- Observing system calls
- Changing process priority

### Important Detours

- `/proc/[pid]`
- Signals through `kill`
- Nice value and scheduling priority

### Diagrams to Include

- Process inspection flow
- `/proc` relationship with kernel process metadata

### Interview Focus

- How to inspect a running process
- How to observe memory usage
- What does `strace` show?
- What is nice value?

### Common Traps

- Thinking `kill` only kills processes
- Confusing virtual memory size with actual RAM usage
- Ignoring process states in `top`

---

## Day 37 — Signals and Inter-Process Communication

### Core Topics

- Signals
- Signal handling
- Pipes
- Named pipes
- Message queues
- Shared memory
- Sockets
- RPC overview

### Practical Angles

- Ctrl+C as SIGINT
- Shell pipes
- Browser helper processes
- Client-server communication

### Important Detours

- Anonymous vs named pipes
- Shared memory speed and synchronization need
- Signals as asynchronous notifications

### Diagrams to Include

- Pipe communication flow
- IPC method comparison table

### Interview Focus

- What are signals?
- IPC methods
- Pipe vs shared memory
- Signal handling
- Socket vs pipe

### Common Traps

- Thinking signals carry large data
- Ignoring synchronization in shared memory
- Confusing pipe with socket

---

## Day 38 — Boot Process and System Startup

### Core Topics

- BIOS
- UEFI
- Bootloader
- Kernel loading
- Kernel initialization
- init
- systemd
- Services
- Login shell

### Practical Angles

- What happens when a laptop starts
- Why bootloader is needed
- How services start automatically

### Important Detours

- GRUB overview
- Kernel image
- init process as first user-space process

### Diagrams to Include

- Boot process sequence
- BIOS/UEFI to shell flow

### Interview Focus

- Boot process
- Role of bootloader
- What is init/systemd?
- What happens after kernel loads?

### Common Traps

- Saying OS starts directly without bootloader
- Confusing BIOS/UEFI with bootloader
- Ignoring user-space startup

---

## Day 39 — OS Performance and Bottlenecks

### Core Topics

- CPU-bound workload
- I/O-bound workload
- Throughput
- Latency
- Response time
- Context switching overhead
- Memory pressure
- Disk bottlenecks
- Network bottlenecks
- Load average overview

### Practical Angles

- Why a system feels slow
- Why CPU may be idle while an app is stuck
- How memory pressure affects performance
- Why high disk I/O can freeze applications

### Important Detours

- Bottleneck thinking
- Observability mindset
- Basic performance debugging flow

### Diagrams to Include

- Bottleneck diagnosis flowchart
- CPU-bound vs I/O-bound timeline

### Interview Focus

- CPU-bound vs I/O-bound
- Latency vs throughput
- How to diagnose slow systems
- Why context switching hurts performance

### Common Traps

- Assuming slow system always means high CPU usage
- Confusing latency with throughput
- Ignoring memory and I/O bottlenecks

---

## Day 40 — Grand Revision and Mock Interview

### Core Topics

This day should not introduce a major new topic.

Revise all major OS areas:

- OS foundations
- System calls and kernel mode
- Processes
- Scheduling
- Threads
- Synchronization
- Deadlocks
- Memory management
- Virtual memory
- File systems
- I/O systems
- Protection
- Virtualization
- Linux practical commands

### Output Requirements

Generate a full mock interview preparation document with:

- 50 rapid-fire questions
- 20 follow-up questions
- 15 trick questions
- 10 numerical-style questions
- 5 long-form explanation prompts
- 5 practical debugging scenarios
- 1 final OS concept map

### Diagrams to Include

- Full OS concept map
- Process-memory-file-system relationship diagram

### Interview Focus

- Consolidation
- Spoken answers
- Follow-up handling
- Trick question defense
- Weak area discovery

### Common Traps

- Remembering definitions but not reasoning
- Failing follow-up questions
- Mixing similar concepts
- Ignoring practical system behavior

---

# Daily Article Generation Checklist

For every day, the generated article should include:

```txt
[ ] Title block
[ ] Opening intuition
[ ] Interview definition
[ ] Mental model
[ ] Deep explanation
[ ] Step-by-step flow
[ ] At least 2 diagrams where applicable
[ ] Practical system relevance
[ ] Code, pseudocode, or commands where useful
[ ] Common misconceptions
[ ] Tricky interview corners
[ ] Comparison tables where useful
[ ] 30-second interview answer
[ ] 2-minute interview answer
[ ] Deep follow-up answer
[ ] Basic interview questions
[ ] Intermediate interview questions
[ ] Advanced interview questions
[ ] Follow-up questions
[ ] Trick questions
[ ] Mini quiz with answers
[ ] 5-minute revision column
[ ] Final takeaway
[ ] What you should be able to answer now
```

---

# Notes for Automation

The automation should read this file and select the topic using the day number from `counter.json`.

Example:

```json
{
  "currentDay": 7,
  "completedDays": [1, 2, 3, 4, 5, 6],
  "lastGeneratedDate": "2026-05-17"
}
```

If `currentDay` is 7, the automation should select:

```txt
Day 7 — Context Switching
```

After successful generation, PDF creation, and email delivery, the automation should increment `currentDay`.

Do not increment the counter if any stage fails.

---

# Final Learning Goal

By the end of 40 days, the learner should be able to:

- Explain OS concepts clearly in interviews
- Handle common follow-up questions
- Solve basic scheduling and paging numericals
- Explain process, thread, memory, file system, and I/O internals
- Connect theoretical OS concepts to Linux and real systems
- Avoid common interview traps
- Speak confidently about practical system behavior
