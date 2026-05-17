# Operating Systems Interview Prep Syllabus

This file is the canonical ordered syllabus for the Codex automation. Each day maps to one article and one daily publish cycle.

## Day 01 - What is an Operating System?
Difficulty: Beginner
Prerequisites: None
Interview Why: Forms the base definition for every OS interview discussion.
Focus: Resource manager; abstraction layer; kernel basics; user view vs system view

## Day 02 - Computer System Architecture for OS
Difficulty: Beginner
Prerequisites: Day 01
Interview Why: Explains how the OS coordinates CPU, memory, devices, and interrupts.
Focus: CPU and memory; device controllers; interrupts; DMA; storage hierarchy; bootstrap

## Day 03 - Kernel, User Mode, and System Calls
Difficulty: Beginner
Prerequisites: Days 01-02
Interview Why: Interviewers use this topic to test protection, privilege, and API-to-kernel flow.
Focus: User mode; kernel mode; privileged instructions; trap; mode switch; system call path

## Day 04 - OS Structures and Services
Difficulty: Intermediate
Prerequisites: Days 01-03
Interview Why: Helps compare kernel designs and the tradeoffs behind them.
Focus: Monolithic kernel; microkernel; layered design; modular kernel; virtual machines; OS services

## Day 05 - Program vs Process
Difficulty: Beginner
Prerequisites: Days 01-04
Interview Why: Clarifies a common foundation question before scheduling and memory topics.
Focus: Program; process; process image; address space; stack/heap/data/text; PCB

## Day 06 - Process States and Lifecycle
Difficulty: Beginner
Prerequisites: Day 05
Interview Why: Sets up scheduling, waiting, and multitasking interview questions.
Focus: New/ready/running/waiting/terminated; suspended states; queues; transitions

## Day 07 - Context Switching
Difficulty: Intermediate
Prerequisites: Days 05-06
Interview Why: Common follow-up for multitasking, overhead, and kernel execution.
Focus: CPU context; registers; program counter; PCB save/restore; process vs thread switch

## Day 08 - Process Scheduling Basics
Difficulty: Intermediate
Prerequisites: Days 06-07
Interview Why: Establishes scheduler goals and terms used in algorithm questions.
Focus: CPU burst; I/O burst; scheduler; dispatcher; criteria; preemptive vs non-preemptive

## Day 09 - Scheduling Algorithms Part 1
Difficulty: Intermediate
Prerequisites: Day 08
Interview Why: Classic comparison topic with starvation and convoy effect traps.
Focus: FCFS; SJF; SRTF; priority scheduling; starvation; aging

## Day 10 - Scheduling Algorithms Part 2
Difficulty: Intermediate
Prerequisites: Day 09
Interview Why: Round Robin and MLFQ are frequent interview problem areas.
Focus: Round Robin; multilevel queue; MLFQ; quantum; response time; turnaround time; waiting time

## Day 11 - Thread Basics
Difficulty: Beginner
Prerequisites: Days 05-10
Interview Why: Bridges from process isolation to lightweight concurrency.
Focus: Thread definition; shared address space; TCB; user-level vs kernel-level threads

## Day 12 - Multithreading Models
Difficulty: Intermediate
Prerequisites: Day 11
Interview Why: Tests concurrency vs parallelism and thread model tradeoffs.
Focus: Many-to-one; one-to-one; many-to-many; thread pools; concurrency vs parallelism

## Day 13 - Race Conditions
Difficulty: Intermediate
Prerequisites: Days 11-12
Interview Why: A core reasoning topic for shared-state correctness.
Focus: Shared data; critical section; atomicity; interleavings; lost update

## Day 14 - Mutex, Locks, and Semaphores
Difficulty: Intermediate
Prerequisites: Day 13
Interview Why: Interviewers often probe semantic differences and correct use.
Focus: Mutex; binary semaphore; counting semaphore; blocking; spinning; ownership

## Day 15 - Classical Synchronization Problems
Difficulty: Intermediate
Prerequisites: Day 14
Interview Why: Producer-consumer and dining philosophers are standard interview cases.
Focus: Producer-consumer; readers-writers; dining philosophers; bounded buffer; sleeping barber overview

## Day 16 - Monitors and Condition Variables
Difficulty: Advanced
Prerequisites: Days 14-15
Interview Why: Tests deeper concurrency understanding beyond lock APIs.
Focus: Monitor; condition variable; wait; signal; Mesa vs Hoare; spurious wakeups

## Day 17 - Deadlocks Part 1
Difficulty: Intermediate
Prerequisites: Days 14-16
Interview Why: Coffman conditions and graphs are standard OS interview material.
Focus: Deadlock definition; necessary conditions; resource allocation graph; circular wait

## Day 18 - Deadlocks Part 2
Difficulty: Advanced
Prerequisites: Day 17
Interview Why: Prevention, avoidance, detection, and recovery require crisp tradeoff reasoning.
Focus: Prevention; avoidance; detection; recovery; Banker’s algorithm

## Day 19 - Memory Management Basics
Difficulty: Intermediate
Prerequisites: Days 03-05
Interview Why: Introduces address translation and process isolation.
Focus: Logical address; physical address; address binding; MMU; relocation; protection

## Day 20 - Contiguous Memory Allocation
Difficulty: Intermediate
Prerequisites: Day 19
Interview Why: Fragmentation questions remain common and practical.
Focus: Fixed partitions; variable partitions; internal fragmentation; external fragmentation; compaction; fit algorithms

## Day 21 - Paging Basics
Difficulty: Intermediate
Prerequisites: Days 19-20
Interview Why: Core virtual memory foundation and numerical question base.
Focus: Pages; frames; page table; page number; offset; translation

## Day 22 - Translation Lookaside Buffer
Difficulty: Intermediate
Prerequisites: Day 21
Interview Why: TLB hit/miss and effective access time are classic interview checks.
Focus: Associative lookup; TLB hit; TLB miss; EAT; context switch impact

## Day 23 - Multi-Level Page Tables
Difficulty: Advanced
Prerequisites: Days 21-22
Interview Why: Helps explain scaling problems in large address spaces.
Focus: Hierarchical paging; two-level paging; inverted page tables; hashed page tables

## Day 24 - Segmentation
Difficulty: Intermediate
Prerequisites: Days 19-23
Interview Why: Often compared directly with paging.
Focus: Segment; segment table; base/limit; protection; sharing; fragmentation

## Day 25 - Virtual Memory
Difficulty: Intermediate
Prerequisites: Days 21-24
Interview Why: Page faults and demand paging are highly interview-relevant.
Focus: Demand paging; lazy loading; swap space; page fault; valid-invalid bit

## Day 26 - Page Replacement Algorithms
Difficulty: Advanced
Prerequisites: Day 25
Interview Why: Tests tradeoffs, anomalies, and approximation reasoning.
Focus: FIFO; optimal; LRU; clock; Belady’s anomaly; thrashing preview

## Day 27 - Thrashing and Working Set
Difficulty: Advanced
Prerequisites: Days 25-26
Interview Why: Good topic for system performance reasoning under memory pressure.
Focus: Thrashing; working set; page fault frequency; local vs global replacement

## Day 28 - File System Basics
Difficulty: Beginner
Prerequisites: Days 01-05
Interview Why: Establishes how OS exposes persistent storage abstractions.
Focus: Files; directories; metadata; operations; attributes; file descriptors

## Day 29 - Directory Structures and File Allocation
Difficulty: Intermediate
Prerequisites: Day 28
Interview Why: Useful for file layout, lookup, and storage allocation questions.
Focus: Directory structures; contiguous allocation; linked allocation; indexed allocation

## Day 30 - Inodes and Unix File System Ideas
Difficulty: Intermediate
Prerequisites: Days 28-29
Interview Why: Strong practical topic for Linux-oriented interviews.
Focus: Inodes; data blocks; direct/indirect pointers; hard links; symbolic links

## Day 31 - Disk Scheduling
Difficulty: Intermediate
Prerequisites: Days 28-30
Interview Why: Still valuable for understanding HDD behavior and algorithm comparisons.
Focus: Seek time; rotational latency; FCFS; SSTF; SCAN; C-SCAN; LOOK; C-LOOK

## Day 32 - I/O Systems
Difficulty: Intermediate
Prerequisites: Days 02 and 28-31
Interview Why: Connects hardware interaction with buffering, drivers, and OS coordination.
Focus: Device drivers; blocking/non-blocking I/O; interrupt-driven I/O; DMA; buffering; spooling

## Day 33 - Protection and Security Basics
Difficulty: Intermediate
Prerequisites: Days 03 and 28-32
Interview Why: Helps explain OS-level access boundaries and least privilege.
Focus: Protection vs security; authentication; authorization; ACLs; capability lists; least privilege

## Day 34 - Virtualization
Difficulty: Intermediate
Prerequisites: Days 03-04 and 33
Interview Why: Frequent in systems, cloud, and infrastructure interviews.
Focus: Hypervisors; Type 1 vs Type 2; full virtualization; para-virtualization; hardware support

## Day 35 - Containers and OS-Level Virtualization
Difficulty: Intermediate
Prerequisites: Days 33-34
Interview Why: Distinguishes kernel isolation from full machine virtualization.
Focus: Containers; namespaces; cgroups; image vs container; container vs VM

## Day 36 - Linux Process and Memory Commands
Difficulty: Beginner
Prerequisites: Days 05-27
Interview Why: Converts OS theory into direct observation and debugging skills.
Focus: ps; top; htop; free; vmstat; pmap; strace; kill; nice; renice

## Day 37 - Signals and Inter-Process Communication
Difficulty: Intermediate
Prerequisites: Days 11-16 and 36
Interview Why: Common practical OS topic across Unix-like systems.
Focus: Signals; pipes; named pipes; message queues; shared memory; sockets; RPC overview

## Day 38 - Boot Process and System Startup
Difficulty: Intermediate
Prerequisites: Days 01-04
Interview Why: Strong systems question for kernel loading and service startup.
Focus: BIOS/UEFI; bootloader; kernel loading; init/systemd; services; login shell

## Day 39 - OS Performance and Bottlenecks
Difficulty: Advanced
Prerequisites: Days 07-10, 25-32, and 36
Interview Why: Pulls scheduling, memory, and I/O together into diagnosis reasoning.
Focus: CPU-bound vs I/O-bound; throughput; latency; response time; memory pressure; disk bottlenecks

## Day 40 - Grand Revision and Mock Interview
Difficulty: Advanced
Prerequisites: Days 01-39
Interview Why: Consolidates the whole subject into mock interview performance.
Focus: Rapid-fire revision; follow-ups; trick questions; numericals; long-form explanations

