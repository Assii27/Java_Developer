/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Play, 
  ArrowRight, 
  Hash, 
  Type, 
  Layers, 
  Filter, 
  CheckCircle2, 
  ChevronDown,
  Terminal,
  Code2,
  BookOpen,
  ChevronRight,
  Cpu,
  Globe,
  Lock,
  Zap,
  Scissors,
  Database,
  Table,
  Copy,
  AlertTriangle,
  List,
  LayoutGrid,
  FileCode,
  Activity
} from "lucide-react";

interface SceneData {
  id: string;
  title: string;
  code: string;
  description: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
}

interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  scenes: SceneData[];
  fullCode: string;
}

interface TheoryQuestion {
  id: string;
  title: string;
  category: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
}

const CODING_QUESTIONS: CodingQuestion[] = [
  {
    id: "stream-api",
    title: "Stream API: Character Counter",
    description: "Visualize how Java Streams count occurrences and find repeats.",
    fullCode: `String str = "asifmanerasifmanerasif";

// Occurrence
Map<Character, Long> map = str.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(
        Function.identity(),
        LinkedHashMap::new,
        Collectors.counting()
    ));

// Repeated characters
Set<Character> repeated = map.entrySet()
    .stream()
    .filter(e -> e.getValue() > 1)
    .map(Map.Entry::getKey)
    .collect(Collectors.toCollection(LinkedHashSet::new));`,
    scenes: [
      {
        id: "input",
        title: "Scene 1: Input String Arrives",
        code: '"asifmanerasifmanerasif"',
        description: "Think of this as a queue of characters walking in one by one.",
        icon: <Type className="w-6 h-6" />,
        visual: "asifmanerasifmanerasif".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="inline-block px-1 font-mono text-2xl font-bold"
          >
            {char}
          </motion.span>
        ))
      },
      {
        id: "chars",
        title: "Scene 2: str.chars()",
        code: "str.chars()",
        description: "Converts string into ASCII stream. Numbers aren't useful yet!",
        icon: <Hash className="w-6 h-6" />,
        visual: "asifmanerasifmanerasif".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="inline-block px-1 font-mono text-lg text-gray-500"
          >
            {char.charCodeAt(0)}
          </motion.span>
        ))
      },
      {
        id: "mapToObj",
        title: "Scene 3: Convert to Characters",
        code: ".mapToObj(c -> (char) c)",
        description: "Back to characters and ready for grouping.",
        icon: <ArrowRight className="w-6 h-6" />,
        visual: "asifmanerasifmanerasif".split("").map((char, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="inline-flex items-center justify-center w-8 h-8 m-1 border border-brand/20 bg-white rounded shadow-sm font-mono font-bold"
          >
            {char}
          </motion.div>
        ))
      },
      {
        id: "grouping",
        title: "Scene 4: Grouping + Counting",
        code: "Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting())",
        description: "The main magic! Characters are grouped and counted in order.",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <div className="grid grid-cols-4 gap-4">
            {Object.entries({ a: 3, s: 3, i: 3, f: 3, m: 2, n: 2, e: 2, r: 2 }).map(([char, count], i) => (
              <motion.div
                key={char}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 bg-white border-2 border-brand rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-xs uppercase font-bold text-gray-400">Char</div>
                <div className="text-2xl font-mono font-bold">{char}</div>
                <div className="mt-2 text-xs uppercase font-bold text-gray-400">Count</div>
                <div className="text-xl font-mono font-bold text-accent bg-brand px-2 inline-block rounded">{count}</div>
              </motion.div>
            ))}
          </div>
        )
      },
      {
        id: "filter",
        title: "Scene 5: Filtering Repeated",
        code: ".filter(e -> e.getValue() > 1)",
        description: "Keep only the characters that appear more than once.",
        icon: <Filter className="w-6 h-6" />,
        visual: (
          <div className="flex flex-wrap gap-2">
            {Object.entries({ a: 3, s: 3, i: 3, f: 3, m: 2, n: 2, e: 2, r: 2 }).map(([char, count], i) => (
              <motion.div
                key={char}
                initial={{ opacity: 1 }}
                whileInView={{ 
                  opacity: count > 1 ? 1 : 0.2,
                  scale: count > 1 ? 1.1 : 0.9,
                  backgroundColor: count > 1 ? "#00FF00" : "#FFFFFF"
                }}
                className="p-4 border-2 border-brand rounded-full font-mono font-bold w-12 h-12 flex items-center justify-center"
              >
                {char}
              </motion.div>
            ))}
          </div>
        )
      },
      {
        id: "collect",
        title: "Scene 6: Final Result",
        code: ".collect(Collectors.toCollection(LinkedHashSet::new))",
        description: "No duplicates, order maintained. Mission accomplished!",
        icon: <CheckCircle2 className="w-6 h-6" />,
        visual: (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 bg-brand text-white rounded-xl font-mono text-xl shadow-2xl"
          >
            <div className="text-accent mb-2 text-sm uppercase tracking-widest font-bold">Output</div>
            [a, s, i, f, m, n, e, r]
          </motion.div>
        )
      }
    ]
  },
  {
    id: "two-sum",
    title: "Algorithm: Two Sum",
    description: "Find two numbers in an array that add up to a specific target.",
    fullCode: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
    scenes: [
      {
        id: "setup",
        title: "Scene 1: The Scenario",
        code: "int[] nums = {2, 7, 11, 15}, target = 9",
        description: "We need to find two indices whose values sum up to 9.",
        icon: <Play className="w-6 h-6" />,
        visual: (
          <div className="flex gap-4">
            {[2, 7, 11, 15].map((num, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-2 border-brand rounded-lg flex items-center justify-center font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {num}
                </div>
                <span className="text-[10px] mt-1 font-bold text-gray-400">idx {i}</span>
              </div>
            ))}
            <div className="flex flex-col items-center ml-4">
              <div className="w-12 h-12 bg-accent border-2 border-brand rounded-lg flex items-center justify-center font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                9
              </div>
              <span className="text-[10px] mt-1 font-bold text-gray-400">Target</span>
            </div>
          </div>
        )
      },
      {
        id: "iteration-1",
        title: "Scene 2: First Step (i=0)",
        code: "nums[0] = 2, complement = 9 - 2 = 7",
        description: "Check if 7 is in our Map. It's not, so we store 2.",
        icon: <ArrowRight className="w-6 h-6" />,
        visual: (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-accent border border-brand rounded font-mono text-sm font-bold">Map: {"{}"}</div>
            </div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs font-bold text-gray-400 uppercase">Action</p>
              <p className="font-mono">map.put(2, 0)</p>
            </motion.div>
          </div>
        )
      },
      {
        id: "iteration-2",
        title: "Scene 3: Second Step (i=1)",
        code: "nums[1] = 7, complement = 9 - 7 = 2",
        description: "Check if 2 is in our Map. YES! We found the pair.",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-brand text-white border border-brand rounded font-mono text-sm font-bold">Map: {"{2: 0}"}</div>
            </div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="p-4 bg-accent border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs font-bold text-brand uppercase">Match Found!</p>
              <p className="font-mono font-bold">Complement 2 is at index 0</p>
            </motion.div>
          </div>
        )
      },
      {
        id: "result",
        title: "Scene 4: Return Result",
        code: "return new int[] { 0, 1 }",
        description: "The indices 0 and 1 correspond to values 2 and 7, which sum to 9.",
        icon: <CheckCircle2 className="w-6 h-6" />,
        visual: (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="p-6 bg-brand text-white rounded-xl font-mono text-2xl shadow-2xl flex gap-4"
          >
            <div className="px-4 py-2 bg-accent text-brand rounded-lg">[0, 1]</div>
          </motion.div>
        )
      }
    ]
  },
  {
    id: "transactional-flow",
    title: "Spring: @Transactional Flow",
    description: "Visualize how Spring manages atomicity and rollbacks during a bank transfer.",
    fullCode: `@Service
public class BankService {
    @Transactional
    public void transfer(Long fromId, Long toId, double amount) {
        Account from = repo.findById(fromId).get();
        from.setBalance(from.getBalance() - amount);
        repo.save(from);

        if (true) { throw new RuntimeException("Error!"); }

        Account to = repo.findById(toId).get();
        to.setBalance(to.getBalance() + amount);
        repo.save(to);
    }
}`,
    scenes: [
      {
        id: "start",
        title: "Scene 1: Initial State",
        code: "Transfer ₹1000 from A to B",
        description: "Both accounts have their initial balances. Transaction starts now.",
        icon: <Play className="w-6 h-6" />,
        visual: (
          <div className="flex gap-8">
            <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center w-32">
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Account A</div>
              <div className="text-2xl font-mono font-bold">₹5000</div>
            </div>
            <div className="flex items-center">
              <ArrowRight className="w-8 h-8 text-brand/20" />
            </div>
            <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center w-32">
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Account B</div>
              <div className="text-2xl font-mono font-bold">₹2000</div>
            </div>
          </div>
        )
      },
      {
        id: "debit",
        title: "Scene 2: Deducting from A",
        code: "from.setBalance(from.getBalance() - 1000)",
        description: "Money is deducted from Account A. The database is updated within the transaction.",
        icon: <ArrowRight className="w-6 h-6" />,
        visual: (
          <div className="flex gap-8">
            <div className="p-6 bg-red-50 border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center w-32 relative">
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Account A</div>
              <div className="text-2xl font-mono font-bold">₹4000</div>
              <motion.div 
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -20, opacity: 0 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-500 font-bold"
              >
                -₹1000
              </motion.div>
            </div>
            <div className="flex items-center">
              <ArrowRight className="w-8 h-8 text-brand" />
            </div>
            <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center w-32">
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Account B</div>
              <div className="text-2xl font-mono font-bold">₹2000</div>
            </div>
          </div>
        )
      },
      {
        id: "error",
        title: "Scene 3: Runtime Error!",
        code: "throw new RuntimeException(\"Error!\")",
        description: "An unexpected error occurs before the second step can complete.",
        icon: <Zap className="w-6 h-6 text-red-500" />,
        visual: (
          <div className="relative">
            <motion.div 
              animate={{ rotate: [0, -2, 2, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="p-8 bg-red-600 text-white border-4 border-brand rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4"
            >
              <Zap className="w-12 h-12 fill-yellow-400 text-yellow-400" />
              <div>
                <h4 className="text-2xl font-black uppercase italic">System Failure</h4>
                <p className="font-mono text-sm opacity-80">RuntimeException: Database connection lost</p>
              </div>
            </motion.div>
          </div>
        )
      },
      {
        id: "rollback",
        title: "Scene 4: Automatic Rollback",
        code: "Transaction Status: ROLLBACK",
        description: "Spring intercepts the exception and reverts all changes. Data remains consistent.",
        icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
        visual: (
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-8">
              <motion.div 
                initial={{ backgroundColor: "#fee2e2" }}
                whileInView={{ backgroundColor: "#ffffff" }}
                className="p-6 border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center w-32"
              >
                <div className="text-xs font-bold text-gray-400 uppercase mb-2">Account A</div>
                <div className="text-2xl font-mono font-bold">₹5000</div>
              </motion.div>
              <div className="flex items-center">
                <ArrowRight className="w-8 h-8 text-brand/20" />
              </div>
              <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center w-32">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2">Account B</div>
                <div className="text-2xl font-mono font-bold">₹2000</div>
              </div>
            </div>
            <div className="px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold uppercase tracking-widest">
              Data Restored Successfully
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "oop-visual",
    title: "OOP: Payment System",
    description: "Visualize Abstraction, Polymorphism, and Inheritance in action.",
    fullCode: `interface Payment { void pay(double amt); }

class UPI implements Payment {
    public void pay(double amt) {
        System.out.println("Paid ₹" + amt + " via UPI");
    }
}

class Card implements Payment {
    public void pay(double amt) {
        System.out.println("Paid ₹" + amt + " via Card");
    }
}

// Usage
Payment p = new UPI();
p.pay(1000);`,
    scenes: [
      {
        id: "abstraction",
        title: "Scene 1: Abstraction",
        code: "interface Payment { void pay(double amt); }",
        description: "We define a contract. We don't care HOW it's paid yet, just that it CAN be paid.",
        icon: <Zap className="w-6 h-6" />,
        visual: (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white border-4 border-dashed border-brand rounded-3xl flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-brand text-accent rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-black uppercase tracking-tighter text-xl italic">Interface: Payment</h4>
              <p className="font-mono text-xs text-gray-500 mt-1">Contract: pay(amount)</p>
            </div>
          </motion.div>
        )
      },
      {
        id: "inheritance",
        title: "Scene 2: Inheritance & Implementation",
        code: "class UPI implements Payment { ... }",
        description: "Specific classes implement the interface, providing concrete logic.",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <div className="flex gap-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center"
            >
              <div className="w-10 h-10 bg-accent rounded-lg mb-2 flex items-center justify-center font-bold">U</div>
              <span className="font-bold text-xs">UPI Class</span>
            </motion.div>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center"
            >
              <div className="w-10 h-10 bg-brand text-white rounded-lg mb-2 flex items-center justify-center font-bold">C</div>
              <span className="font-bold text-xs">Card Class</span>
            </motion.div>
          </div>
        )
      },
      {
        id: "polymorphism",
        title: "Scene 3: Polymorphism",
        code: "Payment p = new UPI(); p.pay(1000);",
        description: "The same 'Payment' variable can hold any implementation and behave differently.",
        icon: <Globe className="w-6 h-6" />,
        visual: (
          <div className="space-y-6 flex flex-col items-center">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-brand text-white rounded-lg font-mono text-sm">Payment p</div>
              <ArrowRight className="w-4 h-4" />
              <motion.div 
                initial={{ backgroundColor: "#000000", color: "#ffffff" }}
                whileInView={{ backgroundColor: "#00FF00", color: "#000000" }}
                className="px-4 py-2 rounded-lg font-mono text-sm font-bold border-2 border-brand"
              >
                new UPI()
              </motion.div>
            </div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="p-4 bg-accent border-2 border-brand rounded-xl font-bold italic"
            >
              "Processing UPI Payment..."
            </motion.div>
          </div>
        )
      },
      {
        id: "encapsulation",
        title: "Scene 4: Encapsulation",
        code: "private double balance; public getBalance() { ... }",
        description: "Data is hidden and only accessible through controlled methods.",
        icon: <Lock className="w-6 h-6" />,
        visual: (
          <div className="relative p-8 bg-brand rounded-3xl overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-0 opacity-10 border-[20px] border-dashed border-white rounded-full"
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 bg-white border-2 border-brand rounded-xl mb-4">
                <Lock className="w-8 h-8 text-brand" />
              </div>
              <div className="text-white font-mono text-sm">
                <span className="text-accent">private</span> balance = ₹5000;
              </div>
              <div className="mt-4 px-4 py-2 bg-accent text-brand rounded-full text-[10px] font-black uppercase">
                Access Denied to Direct Field
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "exception-flow",
    title: "Java: Exception Flow",
    description: "Visualize how try-catch-finally blocks manage runtime errors.",
    fullCode: `public void process() {
    try {
        int x = 10 / 0; // Risky code
        System.out.println("Success");
    } catch (ArithmeticException e) {
        System.out.println("Error caught!");
    } finally {
        System.out.println("Cleanup done");
    }
}`,
    scenes: [
      {
        id: "try",
        title: "Scene 1: Entering Try Block",
        code: "try { int x = 10 / 0; ... }",
        description: "The program enters the risky section. It will attempt to execute line by line.",
        icon: <Play className="w-6 h-6" />,
        visual: (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 bg-white border-4 border-brand rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bg rounded-lg flex items-center justify-center font-mono font-bold">try</div>
              <div className="h-px flex-1 bg-brand/10" />
              <div className="text-sm font-mono text-gray-400 italic">// Monitoring for errors...</div>
            </div>
          </motion.div>
        )
      },
      {
        id: "exception",
        title: "Scene 2: Exception Occurs!",
        code: "int x = 10 / 0;",
        description: "A division by zero triggers an ArithmeticException. Normal flow stops immediately.",
        icon: <Zap className="w-6 h-6 text-red-500" />,
        visual: (
          <div className="relative">
            <motion.div 
              animate={{ x: [-2, 2, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="p-8 bg-red-50 border-4 border-red-500 rounded-3xl flex flex-col items-center gap-4"
            >
              <div className="text-4xl font-black text-red-600">10 / 0</div>
              <div className="px-4 py-1 bg-red-600 text-white rounded text-[10px] font-bold uppercase">ArithmeticException</div>
            </motion.div>
          </div>
        )
      },
      {
        id: "catch",
        title: "Scene 3: Catch Block Intercepts",
        code: "catch (ArithmeticException e) { ... }",
        description: "The matching catch block is found. The program is saved from crashing!",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="p-8 bg-brand text-white rounded-3xl shadow-2xl relative"
          >
            <div className="absolute -top-4 left-6 px-3 py-1 bg-accent text-brand text-xs font-black uppercase rounded">Safety Net</div>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-10 h-10 text-accent" />
              <div>
                <h4 className="font-bold">Exception Handled</h4>
                <p className="text-xs opacity-70">Redirecting to error recovery logic...</p>
              </div>
            </div>
          </motion.div>
        )
      },
      {
        id: "finally",
        title: "Scene 4: Finally Block (Always)",
        code: "finally { cleanup(); }",
        description: "Whether success or failure, the finally block always runs to clean up resources.",
        icon: <CheckCircle2 className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Resource Status</div>
              <div className="text-xl font-mono font-bold text-green-600">CLOSED / CLEANED</div>
            </motion.div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Guaranteed Execution</div>
          </div>
        )
      }
    ]
  },
  {
    id: "solid-principles",
    title: "Design: SOLID Principles",
    description: "Visualize how SOLID transforms a 'God Class' into a scalable, decoupled architecture.",
    fullCode: `// 1. SRP: Single Responsibility
class PaymentService { void process() { ... } }
class PaymentRepository { void save() { ... } }

// 2. OCP: Open/Closed
interface Payment { void pay(int amt); }
class UpiPayment implements Payment { ... }

// 3. LSP: Liskov Substitution
interface Refundable { void refund(int amt); }
class CardPayment extends Payment implements Refundable { ... }

// 4. ISP: Interface Segregation
interface Payable { void pay(int amt); }
interface Refundable { void refund(int amt); }

// 5. DIP: Dependency Inversion
class PaymentService {
    private Payment payment; // abstraction
    PaymentService(Payment p) { this.payment = p; }
}`,
    scenes: [
      {
        id: "srp",
        title: "Scene 1: S - Single Responsibility",
        code: "class PaymentService { ... }",
        description: "Breaking a 'God Class' into focused services. One class, one reason to change.",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-6">
            <motion.div 
              initial={{ scale: 1 }}
              whileInView={{ scale: 0, opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="p-6 bg-red-100 border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              <div className="font-bold text-red-600">God Class</div>
              <div className="text-[10px] mt-2">Logic + DB + Email</div>
            </motion.div>
            <div className="flex gap-4">
              {["Logic", "DB", "Email"].map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5 + (i * 0.2) }}
                  className="p-3 bg-green-100 border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center text-xs font-bold"
                >
                  {s} Service
                </motion.div>
              ))}
            </div>
          </div>
        )
      },
      {
        id: "ocp",
        title: "Scene 2: O - Open/Closed",
        code: "interface Payment { ... }",
        description: "Open for extension (new payment methods), Closed for modification.",
        icon: <Globe className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-brand text-white rounded-xl font-mono text-sm">interface Payment</div>
            <div className="flex gap-2">
              {["UPI", "Card", "Wallet"].map((p, i) => (
                <div key={p} className="p-2 bg-white border border-brand rounded text-[10px] font-bold">{p}</div>
              ))}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="p-2 bg-accent border-2 border-brand rounded text-[10px] font-bold"
              >
                + Crypto
              </motion.div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold italic">No changes needed to existing code!</p>
          </div>
        )
      },
      {
        id: "lsp",
        title: "Scene 3: L - Liskov Substitution",
        code: "interface Refundable { ... }",
        description: "Child classes should replace parents without breaking behavior. Don't force 'Refund' on UPI if it's not supported.",
        icon: <CheckCircle2 className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-8 items-start">
              <div className="text-center">
                <div className="p-3 bg-white border-2 border-brand rounded-xl font-bold text-xs mb-2">Payment</div>
                <div className="w-px h-8 bg-brand mx-auto" />
                <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl font-bold text-xs text-red-600">
                  UPI (Throws Error!)
                </div>
                <p className="text-[8px] text-red-500 mt-1 italic">Violates LSP ❌</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-white border-2 border-brand rounded-xl font-bold text-xs mb-2">Payment</div>
                <div className="flex justify-center gap-4">
                   <div className="w-px h-8 bg-brand" />
                   <div className="w-px h-8 bg-brand" />
                </div>
                <div className="flex gap-2">
                  <div className="p-2 bg-green-50 border-2 border-green-500 rounded-lg font-bold text-[10px] text-green-600">UPI</div>
                  <div className="p-2 bg-green-50 border-2 border-green-500 rounded-lg font-bold text-[10px] text-green-600">Card + Refund</div>
                </div>
                <p className="text-[8px] text-green-600 mt-1 italic">Follows LSP ✅</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "isp",
        title: "Scene 4: I - Interface Segregation",
        code: "interface Payable { ... } interface Refundable { ... }",
        description: "Don't force classes to implement methods they don't need. Split 'God Interfaces' into specific ones.",
        icon: <Scissors className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
             <motion.div 
              initial={{ width: "200px" }}
              whileInView={{ width: "0px", opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="p-4 bg-red-100 border-2 border-brand rounded-xl text-center font-bold text-xs overflow-hidden whitespace-nowrap"
            >
              God Interface (Pay+Refund+Report)
            </motion.div>
            <div className="flex gap-3">
              {["Payable", "Refundable", "Reportable"].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + (i * 0.2) }}
                  className="p-3 bg-accent/20 border-2 border-brand rounded-xl font-bold text-[10px]"
                >
                  {t}
                </motion.div>
              ))}
            </div>
          </div>
        )
      },
      {
        id: "dip",
        title: "Scene 5: D - Dependency Inversion",
        code: "private Payment payment; // Inject via constructor",
        description: "High-level modules depend on abstractions, not concrete implementations.",
        icon: <Zap className="w-6 h-6" />,
        visual: (
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white border-2 border-brand rounded-xl font-bold text-sm">Service</div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-px bg-brand border-dashed border-l-2" />
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-brand">
                <Lock className="w-4 h-4" />
              </div>
              <div className="h-12 w-px bg-brand border-dashed border-l-2" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-bg border border-brand/20 rounded text-[10px] opacity-50">Concrete UPI</div>
              <div className="p-2 bg-bg border border-brand/20 rounded text-[10px] opacity-50">Concrete Card</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "design-patterns",
    title: "Patterns: Payment System",
    description: "Visualize Singleton, Factory, and Strategy patterns working together.",
    fullCode: `// 1. Singleton: Config
class Config {
    private static Config instance;
    public static Config get() { ... }
}

// 2. Factory: Creation
class PaymentFactory {
    public static Payment get(String type) {
        if (type == "UPI") return new UPI();
        return new Card();
    }
}

// 3. Strategy: Execution
class PaymentContext {
    private Strategy s;
    void execute(int amt) { s.pay(amt); }
}`,
    scenes: [
      {
        id: "singleton",
        title: "Scene 1: Singleton (Config)",
        code: "Config c1 = Config.get(); Config c2 = Config.get();",
        description: "Ensuring only one instance exists for global settings like Gateway URLs.",
        icon: <Lock className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-bold"
              >
                Instance A
              </motion.div>
              <div className="flex items-center font-black text-2xl">==</div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-bold"
              >
                Instance B
              </motion.div>
            </div>
            <div className="px-4 py-1 bg-green-500 text-white rounded-full text-[10px] font-black uppercase">Same Memory Address</div>
          </div>
        )
      },
      {
        id: "factory",
        title: "Scene 2: Factory (Creation)",
        code: "Payment p = PaymentFactory.get(\"UPI\");",
        description: "Centralized object creation. The client doesn't know the concrete class.",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <div className="flex items-center gap-6">
            <div className="p-4 bg-brand text-white rounded-xl font-bold text-xs">Factory</div>
            <ArrowRight className="w-6 h-6" />
            <div className="relative">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="p-4 bg-accent border-2 border-brand rounded-xl font-mono text-[10px] font-bold"
              >
                new UPIPayment()
              </motion.div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand rounded-full border-2 border-white" />
            </div>
          </div>
        )
      },
      {
        id: "strategy",
        title: "Scene 3: Strategy (Execution)",
        code: "context.setStrategy(new CardPayment());",
        description: "Switching algorithms at runtime. Choose 'how' to pay dynamically.",
        icon: <Zap className="w-6 h-6" />,
        visual: (
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex gap-2">
              {["UPI", "Card", "Wallet"].map((s, i) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border-2 ${i === 1 ? "bg-brand text-white border-brand" : "bg-white border-brand/20"}`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="p-4 bg-white border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black">C</div>
              <div className="text-xs font-bold italic">"Executing Card Logic..."</div>
            </motion.div>
          </div>
        )
      }
    ]
  },
  {
    id: "hibernate-orm",
    title: "Framework: Hibernate ORM",
    description: "Visualize how Hibernate maps Java Objects to Database Tables automatically.",
    fullCode: `@Entity
@Table(name = "users")
class User {
    @Id @GeneratedValue
    private int id;
    private String name;
}

// Saving Data
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

User user = new User();
user.setName("Asif");
session.save(user);

tx.commit();
session.close();`,
    scenes: [
      {
        id: "mapping",
        title: "Scene 1: Object-Relational Mapping",
        code: "@Entity class User { ... }",
        description: "Hibernate maps the Java class to a DB table and fields to columns.",
        icon: <Layers className="w-6 h-6" />,
        visual: (
          <div className="flex items-center gap-12">
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-[10px] font-bold text-brand mb-2 uppercase">Java Object</div>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="text-blue-600">User {`{`}</div>
                <div className="pl-2">id: 101</div>
                <div className="pl-2">name: "Asif"</div>
                <div className="text-blue-600">{`}`}</div>
              </div>
            </div>
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="w-8 h-8 text-brand" />
            </motion.div>
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-[10px] font-bold text-brand mb-2 uppercase">DB Table (users)</div>
              <table className="text-[10px] border-collapse">
                <thead>
                  <tr className="border-b border-brand/20">
                    <th className="px-2 py-1">id</th>
                    <th className="px-2 py-1">name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1">101</td>
                    <td className="px-2 py-1">Asif</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        id: "session",
        title: "Scene 2: Session & Transaction",
        code: "session.save(user); tx.commit();",
        description: "The Session manages the connection, and Transaction ensures data integrity.",
        icon: <Zap className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <div className="p-3 bg-accent/20 border-2 border-brand rounded-lg text-[10px] font-bold">Session Open</div>
              <div className="p-3 bg-accent/20 border-2 border-brand rounded-lg text-[10px] font-bold">Begin Tx</div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-4 bg-brand text-white rounded-xl font-mono text-[10px]"
            >
              INSERT INTO users (name) VALUES ('Asif');
            </motion.div>
            <div className="px-4 py-1 bg-green-500 text-white rounded-full text-[10px] font-black uppercase">Transaction Committed</div>
          </div>
        )
      }
    ]
  },
  {
    id: "sql-joins",
    title: "SQL: Joins & Queries",
    description: "Visualize how SQL Joins combine data and how to find the second highest salary.",
    fullCode: `-- Inner Join
SELECT e.name, d.dept_name
FROM employee e
INNER JOIN department d ON e.dept_id = d.id;

-- Second Highest Salary
SELECT MAX(salary) 
FROM employee
WHERE salary < (SELECT MAX(salary) FROM employee);`,
    scenes: [
      {
        id: "inner-join",
        title: "Scene 1: Inner Join",
        code: "SELECT * FROM e INNER JOIN d ON e.id = d.id;",
        description: "Returns only the records that have matching values in both tables.",
        icon: <Table className="w-6 h-6" />,
        visual: (
          <div className="relative h-32 w-48">
            <div className="absolute left-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-brand/5 flex items-center justify-start pl-4 text-[10px] font-bold">Emp</div>
            <div className="absolute right-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-brand/5 flex items-center justify-end pr-4 text-[10px] font-bold">Dept</div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-accent border-2 border-brand rounded-full flex items-center justify-center text-[8px] font-black text-center"
            >
              MATCHING<br/>DATA
            </motion.div>
          </div>
        )
      },
      {
        id: "left-join",
        title: "Scene 2: Left Join",
        code: "SELECT * FROM e LEFT JOIN d ON e.id = d.id;",
        description: "Returns all records from the left table, and the matched records from the right table.",
        icon: <Table className="w-6 h-6" />,
        visual: (
          <div className="relative h-32 w-48">
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              className="absolute left-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-accent flex items-center justify-start pl-4 text-[10px] font-bold"
            >
              ALL LEFT
            </motion.div>
            <div className="absolute right-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-brand/5 flex items-center justify-end pr-4 text-[10px] font-bold">Dept</div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-accent border-2 border-brand rounded-full flex items-center justify-center text-[8px] font-black text-center">
              MATCH
            </div>
          </div>
        )
      },
      {
        id: "right-join",
        title: "Scene 3: Right Join",
        code: "SELECT * FROM e RIGHT JOIN d ON e.id = d.id;",
        description: "Returns all records from the right table, and the matched records from the left table.",
        icon: <Table className="w-6 h-6" />,
        visual: (
          <div className="relative h-32 w-48">
            <div className="absolute left-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-brand/5 flex items-center justify-start pl-4 text-[10px] font-bold">Emp</div>
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              className="absolute right-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-accent flex items-center justify-end pr-4 text-[10px] font-bold"
            >
              ALL RIGHT
            </motion.div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-accent border-2 border-brand rounded-full flex items-center justify-center text-[8px] font-black text-center">
              MATCH
            </div>
          </div>
        )
      },
      {
        id: "full-join",
        title: "Scene 4: Full Join",
        code: "SELECT * FROM e FULL OUTER JOIN d ON e.id = d.id;",
        description: "Returns all records when there is a match in either left or right table.",
        icon: <Table className="w-6 h-6" />,
        visual: (
          <div className="relative h-32 w-48">
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              className="absolute left-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-accent flex items-center justify-start pl-4 text-[10px] font-bold"
            >
              LEFT
            </motion.div>
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              className="absolute right-0 top-0 w-32 h-32 rounded-full border-2 border-brand bg-accent flex items-center justify-end pr-4 text-[10px] font-bold"
            >
              RIGHT
            </motion.div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-accent border-2 border-brand rounded-full flex items-center justify-center text-[8px] font-black text-center">
              ALL DATA
            </div>
          </div>
        )
      },
      {
        id: "self-join",
        title: "Scene 5: Self Join",
        code: "SELECT e1.name, e2.name FROM emp e1, emp e2 WHERE e1.mgr_id = e2.id;",
        description: "A table joins with itself, often used for hierarchical data like Managers.",
        icon: <Table className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] font-bold w-32 text-center">Employee Table</div>
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="w-6 h-6 text-brand rotate-90" />
            </motion.div>
            <div className="flex gap-4">
              <div className="p-2 bg-accent/20 border border-brand rounded text-[8px] font-bold">Alias E1 (Emp)</div>
              <div className="p-2 bg-accent/20 border border-brand rounded text-[8px] font-bold">Alias E2 (Mgr)</div>
            </div>
          </div>
        )
      },
      {
        id: "salary-query",
        title: "Scene 6: 2nd Highest Salary",
        code: "WHERE salary < (SELECT MAX(salary) ...)",
        description: "Finding the maximum salary that is strictly less than the absolute maximum.",
        icon: <Hash className="w-6 h-6" />,
        visual: (
          <div className="space-y-2">
            {[90000, 85000, 70000, 60000].map((s, i) => (
              <motion.div
                key={s}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-2 border-2 rounded-lg flex justify-between items-center w-48 ${i === 1 ? "border-accent bg-accent/10" : "border-brand/20 bg-white"}`}
              >
                <span className="text-[10px] font-bold">Emp {i+1}</span>
                <span className="text-[10px] font-mono">${s}</span>
                {i === 0 && <span className="text-[8px] font-black text-brand uppercase">Max</span>}
                {i === 1 && <span className="text-[8px] font-black text-accent uppercase animate-pulse">2nd Max</span>}
              </motion.div>
            ))}
          </div>
        )
      }
    ]
  },
  {
    id: "java-copying",
    title: "Java: Shallow vs Deep Copy",
    description: "Visualize the difference between sharing references and creating independent clones.",
    fullCode: `// Shallow Copy (Shared Reference)
User u2 = (User) u1.clone(); // super.clone()

// Deep Copy (Independent)
User u2 = new User(u1.name, new Address(u1.address.city));`,
    scenes: [
      {
        id: "shallow",
        title: "Scene 1: Shallow Copy",
        code: "u2.address = u1.address;",
        description: "Both objects share the same nested Address object. Changing one affects the other.",
        icon: <Copy className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-12">
              <div className="p-3 bg-white border-2 border-brand rounded-xl font-bold text-xs">User 1</div>
              <div className="p-3 bg-white border-2 border-brand rounded-xl font-bold text-xs">User 2</div>
            </div>
            <div className="relative">
               <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-4 bg-accent border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-bold"
              >
                Shared Address
              </motion.div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-12">
                <div className="w-px h-8 bg-brand rotate-[30deg]" />
                <div className="w-px h-8 bg-brand -rotate-[30deg]" />
              </div>
            </div>
            <p className="text-[10px] text-red-500 font-bold italic">⚠️ One change updates both!</p>
          </div>
        )
      },
      {
        id: "deep",
        title: "Scene 2: Deep Copy",
        code: "u2.address = new Address(u1.address);",
        description: "Independent copies are created for nested objects. Fully isolated state.",
        icon: <CheckCircle2 className="w-6 h-6" />,
        visual: (
          <div className="flex gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-white border-2 border-brand rounded-lg font-bold text-[10px]">User 1</div>
              <div className="w-px h-4 bg-brand" />
              <div className="p-3 bg-green-100 border-2 border-brand rounded-xl text-[10px] font-bold">Address A</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-white border-2 border-brand rounded-lg font-bold text-[10px]">User 2</div>
              <div className="w-px h-4 bg-brand" />
              <div className="p-3 bg-blue-100 border-2 border-brand rounded-xl text-[10px] font-bold">Address B</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "fail-fast-safe",
    title: "Collections: Fail-Fast vs Safe",
    description: "Visualize how Java handles concurrent modifications during iteration.",
    fullCode: `// Fail-Fast (ArrayList)
for (String s : list) {
    list.add("C"); // Throws Exception!
}

// Fail-Safe (CopyOnWriteArrayList)
for (String s : list) {
    list.add("C"); // Works on Copy!
}`,
    scenes: [
      {
        id: "fail-fast",
        title: "Scene 1: Fail-Fast (Crash)",
        code: "throw new ConcurrentModificationException();",
        description: "Immediately stops execution if the collection is modified during iteration.",
        icon: <AlertTriangle className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {["A", "B", "C"].map((item, i) => (
                <div key={i} className="w-8 h-8 bg-white border-2 border-brand rounded flex items-center justify-center font-bold text-xs">{item}</div>
              ))}
            </div>
            <motion.div 
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              className="p-3 bg-red-500 text-white rounded-xl font-black text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              💥 EXCEPTION!
            </motion.div>
            <p className="text-[8px] text-gray-400 font-bold uppercase">Structural Change Detected</p>
          </div>
        )
      },
      {
        id: "fail-safe",
        title: "Scene 2: Fail-Safe (Copy)",
        code: "Iterator works on Snapshot",
        description: "Iteration happens on a separate copy, allowing modifications to the original.",
        icon: <CheckCircle2 className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="flex gap-2 opacity-30">
                {["A", "B", "C"].map((item, i) => (
                  <div key={i} className="w-8 h-8 bg-white border-2 border-brand rounded flex items-center justify-center font-bold text-xs">{item}</div>
                ))}
              </div>
              <div className="absolute -top-1 -left-1 px-2 py-0.5 bg-brand text-white text-[6px] font-black rounded">ORIGINAL</div>
            </div>
            <ArrowRight className="w-4 h-4 text-brand rotate-90" />
            <div className="relative">
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex gap-2"
              >
                {["A", "B"].map((item, i) => (
                  <div key={i} className="w-8 h-8 bg-accent border-2 border-brand rounded flex items-center justify-center font-bold text-xs">{item}</div>
                ))}
              </motion.div>
              <div className="absolute -top-1 -left-1 px-2 py-0.5 bg-accent text-brand text-[6px] font-black rounded">SNAPSHOT</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "collections-framework",
    title: "Java: Collections Framework",
    description: "Visualize the core interfaces of the Java Collections Framework: List, Set, and Map.",
    fullCode: `// 1. List: Ordered & Duplicates allowed
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Apple"); // Allowed

// 2. Set: Unique elements only
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Apple"); // Ignored

// 3. Map: Key-Value pairs
Map<Integer, String> map = new HashMap<>();
map.put(1, "Java");
map.put(1, "Python"); // Overwrites "Java"`,
    scenes: [
      {
        id: "list",
        title: "Scene 1: List (Ordered)",
        code: "list.add(\"A\"); list.add(\"A\");",
        description: "Maintains insertion order and allows duplicate elements. Think of it as a dynamic array.",
        icon: <List className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-10 h-10 bg-white border-2 border-brand rounded-lg flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="text-[8px] text-gray-400 font-bold">[{i}]</span>
                  <span className="text-xs font-bold">{i === 1 || i === 2 ? "A" : i === 0 ? "B" : "C"}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-[10px] text-brand font-bold italic">Duplicates allowed at different indices!</p>
          </div>
        )
      },
      {
        id: "set",
        title: "Scene 2: Set (Unique)",
        code: "set.add(\"A\"); set.add(\"A\"); // fails",
        description: "Does not allow duplicate elements. Ideal for storing unique IDs or distinct items.",
        icon: <LayoutGrid className="w-6 h-6" />,
        visual: (
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white border-2 border-brand rounded-full w-24 h-24 flex items-center justify-center relative">
               <div className="grid grid-cols-2 gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold">A</div>
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold">B</div>
               </div>
               <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col items-center"
               >
                  <div className="w-6 h-6 bg-red-100 border border-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-red-500">A</div>
                  <span className="text-[8px] text-red-500 font-black mt-1">REJECTED</span>
               </motion.div>
            </div>
          </div>
        )
      },
      {
        id: "map",
        title: "Scene 3: Map (Key-Value)",
        code: "map.put(key, value);",
        description: "Stores data in Key-Value pairs. Keys must be unique, but values can be duplicated.",
        icon: <Table className="w-6 h-6" />,
        visual: (
          <div className="space-y-2">
            {[
              { k: 101, v: "Asif" },
              { k: 102, v: "John" },
              { k: 103, v: "Asif" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-2 items-center"
              >
                <div className="w-12 py-1 bg-brand text-white rounded text-[10px] font-bold text-center">ID: {item.k}</div>
                <ArrowRight className="w-3 h-3 text-brand" />
                <div className="w-16 py-1 bg-accent border border-brand rounded text-[10px] font-bold text-center">{item.v}</div>
              </motion.div>
            ))}
          </div>
        )
      }
    ]
  },
  {
    id: "java8-features",
    title: "Java 8: Streams & Lambdas",
    description: "Visualize the power of functional programming in Java 8.",
    fullCode: `// Stream API: Filter & Process
List<Integer> payments = Arrays.asList(100, 200, 5000, 7000);

payments.stream()
        .filter(p -> p > 1000)
        .forEach(System.out::println);

// Optional: Avoid Nulls
Optional<String> user = Optional.ofNullable(getUser());
user.ifPresent(u -> System.out.println(u));`,
    scenes: [
      {
        id: "streams",
        title: "Scene 1: Stream Pipeline",
        code: "stream().filter(p > 1000)",
        description: "Data flows through a pipeline of operations. Only elements matching the filter pass through.",
        icon: <Filter className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[500, 2000, 800, 5000].map((val, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: val > 1000 ? [0, 50] : [0, 20],
                    opacity: val > 1000 ? [1, 1] : [1, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                  className="w-10 h-10 bg-white border-2 border-brand rounded flex items-center justify-center font-bold text-[10px]"
                >
                  {val}
                </motion.div>
              ))}
            </div>
            <div className="w-48 h-1 bg-brand/20 relative">
               <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 px-2 py-0.5 bg-brand text-white text-[6px] font-black rounded">FILTER {">"} 1000</div>
            </div>
            <div className="flex gap-2 mt-8">
               <div className="w-10 h-10 border-2 border-dashed border-brand/20 rounded flex items-center justify-center text-[8px] text-gray-400">Filtered</div>
            </div>
          </div>
        )
      },
      {
        id: "optional",
        title: "Scene 2: Optional Safety",
        code: "Optional.ofNullable(user)",
        description: "A container object which may or may not contain a non-null value. Prevents NPE.",
        icon: <Lock className="w-6 h-6" />,
        visual: (
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
               <div className="p-2 bg-gray-100 rounded text-[8px] font-bold">null</div>
               <ArrowRight className="w-4 h-4 text-brand" />
               <div className="w-12 h-12 border-2 border-brand rounded-full flex items-center justify-center text-[8px] font-black text-gray-400">EMPTY</div>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="p-2 bg-accent/20 border border-brand rounded text-[8px] font-bold">"Asif"</div>
               <ArrowRight className="w-4 h-4 text-brand" />
               <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-[8px] font-black">VALUE</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "java21-features",
    title: "Java 21: Virtual Threads",
    description: "Visualize high-scalability concurrency with Virtual Threads.",
    fullCode: `// Virtual Threads: Millions of tasks
Thread.startVirtualThread(() -> {
    System.out.println("Processing payment...");
});

// Pattern Matching for switch
switch (payment) {
    case UPI u -> System.out.println("UPI: " + u.id());
    case Card c -> System.out.println("Card: " + c.number());
}`,
    scenes: [
      {
        id: "virtual-threads",
        title: "Scene 1: Virtual vs Platform Threads",
        code: "Thread.startVirtualThread(task)",
        description: "Virtual threads are lightweight and mapped to OS threads by the JVM. Handle millions of tasks.",
        icon: <Activity className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 20, 10] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                  className="w-1 bg-brand rounded-full"
                />
              ))}
            </div>
            <div className="p-3 bg-accent border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] font-black">
              10,000+ VIRTUAL THREADS
            </div>
            <div className="w-px h-8 bg-brand border-dashed" />
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-white text-[8px] font-bold">OS 1</div>
               <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-white text-[8px] font-bold">OS 2</div>
            </div>
          </div>
        )
      },
      {
        id: "pattern-matching",
        title: "Scene 2: Pattern Matching",
        code: "case UPI u -> ...",
        description: "Cleaner switch expressions with automatic casting and extraction.",
        icon: <Zap className="w-6 h-6" />,
        visual: (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
               <motion.div 
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-white border-2 border-brand rounded-xl font-bold text-[10px]"
               >
                 Object obj = new UPI();
               </motion.div>
            </div>
            <ArrowRight className="w-4 h-4 text-brand rotate-90" />
            <div className="p-4 bg-accent border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <div className="text-[10px] font-mono">
                 <span className="text-blue-600">case</span> UPI u -{">"} <br/>
                 <span className="text-gray-400">// u is already casted!</span><br/>
                 process(u.id());
               </div>
            </div>
          </div>
        )
      }
    ]
  }
];

const THEORY_QUESTIONS: TheoryQuestion[] = [
  {
    id: "jvm-memory",
    title: "JVM Memory Model",
    category: "Architecture",
    icon: <Cpu className="w-5 h-5" />,
    answer: (
      <div className="space-y-4">
        <p>The JVM memory is divided into several areas:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Heap:</strong> Stores objects. Shared among all threads. Divided into Young and Old generations.</li>
          <li><strong>Stack:</strong> Stores local variables and partial results. Each thread has its own stack.</li>
          <li><strong>Metaspace:</strong> Stores class metadata (replaces PermGen in Java 8+).</li>
          <li><strong>PC Register:</strong> Stores the address of the current instruction being executed.</li>
          <li><strong>Native Method Stack:</strong> Used for native methods written in C/C++.</li>
        </ul>
      </div>
    )
  },
  {
    id: "oop-principles",
    title: "OOP in Java",
    category: "Fundamentals",
    icon: <Globe className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <p className="text-lg font-medium border-l-4 border-accent pl-4">
          Object-Oriented Programming (OOP) is a paradigm that organizes software design around <strong>objects</strong> (data + behavior) rather than functions and logic.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Encapsulation */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <h4 className="font-bold text-lg">1. Encapsulation</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Wrapping data and methods into a single unit and restricting access using <code>private</code>.</p>
            <div className="bg-bg p-3 rounded-lg font-mono text-[10px]">
              <pre>{`class User {
  private String name;
  public String getName() { return name; }
  public void setName(String n) { this.name = n; }
}`}</pre>
            </div>
          </div>

          {/* Inheritance */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h4 className="font-bold text-lg">2. Inheritance</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Mechanism where one class acquires properties of another using <code>extends</code>.</p>
            <div className="bg-bg p-3 rounded-lg font-mono text-[10px]">
              <pre>{`class Animal { void eat() {} }
class Dog extends Animal { void bark() {} }`}</pre>
            </div>
          </div>

          {/* Polymorphism */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <h4 className="font-bold text-lg">3. Polymorphism</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Ability of an object to take many forms (Overloading vs Overriding).</p>
            <div className="bg-bg p-3 rounded-lg font-mono text-[10px]">
              <pre>{`// Overriding
@Override
void sound() { System.out.println("Bark"); }`}</pre>
            </div>
          </div>

          {/* Abstraction */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <h4 className="font-bold text-lg">4. Abstraction</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Hiding implementation details using <code>abstract</code> classes or <code>interfaces</code>.</p>
            <div className="bg-bg p-3 rounded-lg font-mono text-[10px]">
              <pre>{`interface Payment { void pay(); }
class UPI implements Payment { ... }`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Core Concepts Summary
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
            <div className="space-y-1">
              <p className="font-black uppercase text-accent">Access Modifiers</p>
              <p>private, default, protected, public</p>
            </div>
            <div className="space-y-1">
              <p className="font-black uppercase text-accent">Keywords</p>
              <p>this, super, static, final</p>
            </div>
            <div className="space-y-1">
              <p className="font-black uppercase text-accent">Lifecycle</p>
              <p>Constructor, Initialization</p>
            </div>
            <div className="space-y-1">
              <p className="font-black uppercase text-accent">Structure</p>
              <p>Class (Blueprint) vs Object (Instance)</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-2 border-dashed border-brand/20 rounded-2xl bg-bg/50">
          <h4 className="font-bold mb-2">🧠 Real-World Scenario</h4>
          <p className="text-sm text-gray-600 italic">
            "A Payment System uses <strong>Abstraction</strong> (Interface Payment) and <strong>Polymorphism</strong> (CreditCard vs UPI implementations) to handle different payment methods through a single interface."
          </p>
        </div>
      </div>
    )
  },
  {
    id: "rest-api",
    title: "REST API Constraints",
    category: "Web Services",
    icon: <Zap className="w-5 h-5" />,
    answer: (
      <div className="space-y-3">
        <p className="font-medium">A truly RESTful system must follow these 6 constraints:</p>
        <div className="space-y-2">
          {[
            "Client-Server Architecture",
            "Statelessness",
            "Cacheability",
            "Layered System",
            "Code on Demand (Optional)",
            "Uniform Interface"
          ].map((c, i) => (
            <div key={c} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-brand/5">
              <span className="w-6 h-6 flex items-center justify-center bg-brand text-accent rounded-full text-xs font-bold">{i+1}</span>
              <span className="text-sm font-medium">{c}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "transactional",
    title: "What is @Transactional?",
    category: "Spring Framework",
    icon: <Lock className="w-5 h-5" />,
    answer: (
      <div className="space-y-6">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">@Transactional is used to manage database transactions automatically in Spring. It ensures <strong>Atomicity</strong>: all operations succeed (COMMIT) or everything fails (ROLLBACK).</p>
        </div>

        <div>
          <h4 className="font-bold flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-brand" />
            Real-Life Example: Bank Transfer
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-xs font-black text-red-600 uppercase mb-2">Without @Transactional</p>
              <p className="text-sm">1. Deduct ₹1000 from A ✅</p>
              <p className="text-sm">2. Add ₹1000 to B ❌ (Fails)</p>
              <p className="font-bold text-red-700 mt-2">Result: Data Inconsistency!</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs font-black text-green-600 uppercase mb-2">With @Transactional</p>
              <p className="text-sm">1. Deduct ₹1000 from A</p>
              <p className="text-sm">2. Add ₹1000 to B</p>
              <p className="font-bold text-green-700 mt-2">Result: Rollback everything if any step fails.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold">⚙️ Internal Working (Proxy Pattern)</h4>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Client calls a method annotated with <code>@Transactional</code>.</li>
            <li><strong>Spring Proxy</strong> intercepts the call.</li>
            <li>Proxy starts a new <strong>Transaction</strong>.</li>
            <li>Method executes.</li>
            <li>If success → <strong>COMMIT</strong>. If Exception → <strong>ROLLBACK</strong>.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-bg rounded-lg border border-brand/5">
            <p className="text-[10px] font-black uppercase text-gray-400">Propagation</p>
            <p className="text-xs font-bold">REQUIRED (Default), REQUIRES_NEW, SUPPORTS</p>
          </div>
          <div className="p-3 bg-bg rounded-lg border border-brand/5">
            <p className="text-[10px] font-black uppercase text-gray-400">Isolation</p>
            <p className="text-xs font-bold">READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE</p>
          </div>
          <div className="p-3 bg-bg rounded-lg border border-brand/5">
            <p className="text-[10px] font-black uppercase text-gray-400">Rollback Rules</p>
            <p className="text-xs font-bold">Default: RuntimeException only. Use <code>rollbackFor</code> for others.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "exception-handling",
    title: "Exception Handling",
    category: "Fundamentals",
    icon: <Zap className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">In high-stakes systems like <strong>Payments</strong>, exception handling isn't just about preventing crashes—it's about maintaining <strong>Data Consistency</strong> and preventing money loss.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand" />
              1. Business Exceptions
            </h4>
            <p className="text-sm text-gray-600">Custom exceptions for business rules (e.g., Insufficient Balance).</p>
            <div className="bg-bg p-3 rounded-lg font-mono text-[10px] border border-brand/5">
              <pre>{`class InvalidAmountException extends Exception {
  public InvalidAmountException(String msg) { super(msg); }
}`}</pre>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand" />
              2. System Exceptions
            </h4>
            <p className="text-sm text-gray-600">Unexpected failures like Bank API timeouts or DB crashes.</p>
            <div className="bg-bg p-3 rounded-lg font-mono text-[10px] border border-brand/5">
              <pre>{`if (bankServiceDown) {
  throw new RuntimeException("Bank API Down");
}`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-brand rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-brand text-white px-4 py-2 text-xs font-black uppercase tracking-widest">Production Flow: Payment Service</div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="w-24 text-gray-400">Step 1</div>
              <div className="flex-1 p-2 bg-bg rounded border border-brand/5">Validate Amount & Balance</div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="w-24 text-gray-400">Step 2</div>
              <div className="flex-1 p-2 bg-accent/20 rounded border border-accent/50">Call External Bank API (Risky)</div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="w-24 text-gray-400">Step 3</div>
              <div className="flex-1 p-2 bg-bg rounded border border-brand/5">Save Transaction to DB</div>
            </div>
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Catch Blocks</p>
              <p className="text-[10px] text-red-800 italic">IOException (API Fail), SQLException (DB Fail), Exception (Unexpected)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand" />
            Global Exception Handling (@RestControllerAdvice)
          </h4>
          <p className="text-sm text-gray-600">Centralized logic to catch exceptions from any controller and return clean, user-friendly responses.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Retry Mechanism", "Circuit Breaker", "Idempotency", "Logging"].map(p => (
              <div key={p} className="p-2 bg-bg rounded border border-brand/10 text-center">
                <p className="text-[10px] font-bold">{p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-red-600 text-white rounded-2xl">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Critical Warning
          </h4>
          <p className="text-xs opacity-90 leading-relaxed">
            Without proper handling in payments, you risk <strong>Duplicate Transactions</strong>, <strong>Money Loss</strong>, or <strong>Partial Failures</strong> (where money is deducted but the order isn't saved). Always use <code>finally</code> to ensure resources are closed and <code>Idempotency</code> to prevent double-charging.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "docker-image",
    title: "Docker: Create Image",
    category: "DevOps",
    icon: <Terminal className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">Docker is used to package an application and its dependencies into a standardized unit called a <strong>container</strong>. An <strong>Image</strong> is the read-only blueprint for that container.</p>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand" />
            Step-by-Step Flow: Code to Container
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-4 p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-8 h-8 bg-brand text-accent rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <p className="font-bold text-sm">Create Artifact (JAR)</p>
                <p className="text-xs text-gray-500 mb-2">Build your Spring Boot application.</p>
                <code className="block p-2 bg-bg rounded text-[10px] font-mono">mvn clean package</code>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-8 h-8 bg-brand text-accent rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div className="flex-1">
                <p className="font-bold text-sm">Write Dockerfile</p>
                <p className="text-xs text-gray-500 mb-2">Define the environment and execution steps.</p>
                <div className="bg-bg p-3 rounded-lg font-mono text-[10px]">
                  <pre>{`FROM openjdk:17
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]`}</pre>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-8 h-8 bg-brand text-accent rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <p className="font-bold text-sm">Build Image</p>
                <p className="text-xs text-gray-500 mb-2">Create the blueprint from the Dockerfile.</p>
                <code className="block p-2 bg-bg rounded text-[10px] font-mono">docker build -t myapp:1.0 .</code>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-8 h-8 bg-brand text-accent rounded-full flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <p className="font-bold text-sm">Run Container</p>
                <p className="text-xs text-gray-500 mb-2">Start the application instance.</p>
                <code className="block p-2 bg-bg rounded text-[10px] font-mono">docker run -p 8080:8080 myapp:1.0</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Interview Key Points
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 border border-white/10 rounded-lg">
              <p className="font-bold text-accent mb-1">Image</p>
              <p className="opacity-70">A read-only blueprint containing code, libraries, and environment.</p>
            </div>
            <div className="p-3 border border-white/10 rounded-lg">
              <p className="font-bold text-accent mb-1">Container</p>
              <p className="opacity-70">A running instance of an image. Isolated and portable.</p>
            </div>
            <div className="p-3 border border-white/10 rounded-lg">
              <p className="font-bold text-accent mb-1">Portability</p>
              <p className="opacity-70">"Build once, run anywhere" across different environments.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "solid-concept",
    title: "What is SOLID?",
    category: "Architecture",
    icon: <Layers className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">SOLID is a set of 5 design principles that solve problems like tight coupling, hard-to-change code, and poor scalability. Critical for evolving systems like <strong>Payment Microservices</strong>.</p>
        </div>

        <div className="space-y-6">
          {[
            { 
              s: "S", 
              t: "Single Responsibility", 
              d: "A class should have only one reason to change.",
              ex: "Separate Payment logic from Notification and DB logic."
            },
            { 
              s: "O", 
              t: "Open/Closed", 
              d: "Open for extension, closed for modification.",
              ex: "Add 'Crypto' payment by adding a new class, not by modifying the 'if-else' in Service."
            },
            { 
              s: "L", 
              t: "Liskov Substitution", 
              d: "Child classes should replace parents without breaking behavior.",
              ex: "Don't force a 'Refund' method on a payment type that doesn't support it."
            },
            { 
              s: "I", 
              t: "Interface Segregation", 
              d: "Prefer small, specific interfaces over one large 'God' interface.",
              ex: "Separate 'Payable' from 'Refundable' interfaces."
            },
            { 
              s: "D", 
              t: "Dependency Inversion", 
              d: "Depend on abstractions, not concretions.",
              ex: "Use Dependency Injection (@Autowired) to inject interfaces."
            }
          ].map(p => (
            <div key={p.s} className="flex gap-6 p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-brand text-accent rounded-xl flex items-center justify-center text-2xl font-black shrink-0">{p.s}</div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg">{p.t}</h4>
                <p className="text-sm text-gray-600">{p.d}</p>
                <p className="text-xs font-mono text-brand mt-2 bg-bg p-2 rounded">Example: {p.ex}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Microservices Impact
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[10px]">
            <div className="p-3 border border-white/10 rounded-lg">
              <p className="font-bold text-accent">SRP</p>
              <p className="opacity-70">One service = one responsibility.</p>
            </div>
            <div className="p-3 border border-white/10 rounded-lg">
              <p className="font-bold text-accent">OCP</p>
              <p className="opacity-70">Add new services without breaking old ones.</p>
            </div>
            <div className="p-3 border border-white/10 rounded-lg">
              <p className="font-bold text-accent">DIP</p>
              <p className="opacity-70">Loose coupling between services.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "design-patterns-theory",
    title: "Design Patterns",
    category: "Architecture",
    icon: <Layers className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">Design patterns are proven solutions to common software design problems. In <strong>Payment Systems</strong>, they ensure flexibility as new payment methods and rules are added constantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Singleton */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand" />
              1. Singleton
            </h4>
            <p className="text-xs text-gray-600 mb-4">Ensures only one instance of a class exists (e.g., DB Connection, Config).</p>
            <div className="bg-bg p-2 rounded font-mono text-[9px]">
              <pre>{`if (instance == null) {
  instance = new Config();
}`}</pre>
            </div>
          </div>

          {/* Factory */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand" />
              2. Factory
            </h4>
            <p className="text-xs text-gray-600 mb-4">Creates objects without exposing creation logic. Centralizes <code>new</code> calls.</p>
            <div className="bg-bg p-2 rounded font-mono text-[9px]">
              <pre>{`PaymentFactory.get("UPI")`}</pre>
            </div>
          </div>

          {/* Strategy */}
          <div className="p-5 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand" />
              3. Strategy
            </h4>
            <p className="text-xs text-gray-600 mb-4">Switch algorithms at runtime. Choose behavior dynamically based on user choice.</p>
            <div className="bg-bg p-2 rounded font-mono text-[9px]">
              <pre>{`context.setStrategy(card)`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" />
            Real Architecture Flow
          </h4>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest">
            <div className="px-4 py-2 border border-white/20 rounded">Controller</div>
            <ArrowRight className="hidden md:block" />
            <div className="px-4 py-2 bg-accent text-brand rounded">Factory (Create)</div>
            <ArrowRight className="hidden md:block" />
            <div className="px-4 py-2 bg-accent text-brand rounded">Strategy (Execute)</div>
            <ArrowRight className="hidden md:block" />
            <div className="px-4 py-2 border border-white/20 rounded">Bank API</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-bg rounded-xl border border-brand/5">
            <h4 className="font-bold text-sm mb-2">Factory vs Strategy</h4>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>• <strong>Factory:</strong> Focuses on <em>Object Creation</em>.</li>
              <li>• <strong>Strategy:</strong> Focuses on <em>Behavior/Logic</em>.</li>
            </ul>
          </div>
          <div className="p-4 bg-bg rounded-xl border border-brand/5">
            <h4 className="font-bold text-sm mb-2">Interview Insight</h4>
            <p className="text-xs text-gray-600 italic">"Strategy is the most important pattern in payments because it allows adding new payment methods without changing the service logic."</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "hibernate-theory",
    title: "Hibernate Framework",
    category: "Frameworks",
    icon: <Database className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">Hibernate is an <strong>ORM (Object Relational Mapping)</strong> tool that simplifies Java application development by mapping Java objects to database tables.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-brand">
              <Layers className="w-4 h-4" />
              Core Architecture
            </h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• <strong>SessionFactory:</strong> Thread-safe, immutable cache of compiled mappings. Created once per app.</li>
              <li>• <strong>Session:</strong> Short-lived object representing a conversation between app and DB.</li>
              <li>• <strong>Transaction:</strong> Single-threaded, short-lived object used by the app to specify atomic units of work.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-brand">
              <Zap className="w-4 h-4" />
              Key Advantages
            </h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• <strong>Productivity:</strong> Eliminates boilerplate JDBC code and manual SQL mapping.</li>
              <li>• <strong>Maintainability:</strong> Changes in DB schema only require updates in mapping, not Java code.</li>
              <li>• <strong>Performance:</strong> Built-in First-level and Second-level caching mechanisms.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-brand rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-brand text-white px-4 py-2 text-xs font-black uppercase tracking-widest">Hibernate States</div>
          <div className="p-6 grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="p-2 bg-gray-100 rounded font-bold text-[10px]">Transient</div>
              <p className="text-[8px] text-gray-500">New object, not in DB</p>
            </div>
            <div className="space-y-1">
              <div className="p-2 bg-green-100 rounded font-bold text-[10px]">Persistent</div>
              <p className="text-[8px] text-gray-500">Associated with Session</p>
            </div>
            <div className="space-y-1">
              <div className="p-2 bg-red-100 rounded font-bold text-[10px]">Detached</div>
              <p className="text-[8px] text-gray-500">Session closed, but in DB</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "sql-joins-theory",
    title: "SQL Joins & Queries",
    category: "Database",
    icon: <Table className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">SQL Joins are used to combine rows from two or more tables based on a related column between them.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: "INNER JOIN", d: "Returns records with matching values in both tables.", c: "bg-blue-50" },
            { t: "LEFT JOIN", d: "Returns all from left table + matching from right.", c: "bg-orange-50" },
            { t: "RIGHT JOIN", d: "Returns all from right table + matching from left.", c: "bg-purple-50" },
            { t: "FULL JOIN", d: "Returns all records when there is a match in either table.", c: "bg-green-50" }
          ].map(j => (
            <div key={j.t} className={`p-4 rounded-xl border border-brand/10 ${j.c}`}>
              <h4 className="font-bold text-sm mb-1">{j.t}</h4>
              <p className="text-xs text-gray-600">{j.d}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-bold flex items-center gap-2">
            <Hash className="w-4 h-4 text-brand" />
            Interview Classic: 2nd Highest Salary
          </h4>
          <div className="space-y-3">
            <div className="p-4 bg-bg rounded-xl border border-brand/5">
              <p className="text-[10px] font-black text-brand uppercase mb-2">Method 1: Subquery (Universal)</p>
              <code className="block text-[10px] font-mono leading-relaxed">
                SELECT MAX(salary) FROM employee<br/>
                WHERE salary &lt; (SELECT MAX(salary) FROM employee);
              </code>
            </div>
            <div className="p-4 bg-bg rounded-xl border border-brand/5">
              <p className="text-[10px] font-black text-brand uppercase mb-2">Method 2: LIMIT/OFFSET (MySQL/Postgres)</p>
              <code className="block text-[10px] font-mono leading-relaxed">
                SELECT DISTINCT salary FROM employee<br/>
                ORDER BY salary DESC LIMIT 1 OFFSET 1;
              </code>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "copying-theory",
    title: "Shallow vs Deep Copy",
    category: "Java Core",
    icon: <Copy className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">Copying determines how independent a new object is from its source. In <strong>Payment Systems</strong>, deep copying is vital for maintaining immutable transaction records.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-2 text-red-600">Shallow Copy</h4>
            <p className="text-xs text-gray-600 mb-4">Copies top-level fields but shares references to nested objects.</p>
            <ul className="text-[10px] space-y-1 text-gray-500 italic">
              <li>• Fast performance</li>
              <li>• Memory efficient</li>
              <li>• Dangerous for nested state</li>
            </ul>
          </div>
          <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-2 text-green-600">Deep Copy</h4>
            <p className="text-xs text-gray-600 mb-4">Recursively copies all nested objects. Fully independent.</p>
            <ul className="text-[10px] space-y-1 text-gray-500 italic">
              <li>• Slower performance</li>
              <li>• Higher memory usage</li>
              <li>• Thread-safe & secure</li>
            </ul>
          </div>
        </div>

        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Payment System Use Case
          </h4>
          <p className="text-xs opacity-80 leading-relaxed">
            When a user updates their <strong>Profile Address</strong>, we must ensure that past <strong>Transaction Receipts</strong> (which share the same Address object) don't change. A <strong>Deep Copy</strong> of the address at the time of transaction is required to maintain audit integrity.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "fail-fast-theory",
    title: "Fail-Fast vs Fail-Safe",
    category: "Collections",
    icon: <AlertTriangle className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">These strategies define how iterators behave when the underlying collection is modified concurrently.</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-6 p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Fail-Fast (ArrayList, HashMap)</h4>
              <p className="text-sm text-gray-600">Throws <code>ConcurrentModificationException</code> immediately. Uses a <code>modCount</code> to detect changes.</p>
              <p className="text-[10px] mt-2 font-bold text-red-500 uppercase">Best for: Debugging, strict data consistency.</p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Fail-Safe (ConcurrentHashMap, CopyOnWriteArrayList)</h4>
              <p className="text-sm text-gray-600">Operates on a <strong>clone/snapshot</strong> of the collection. No exception thrown.</p>
              <p className="text-[10px] mt-2 font-bold text-green-500 uppercase">Best for: Multi-threaded environments, high availability.</p>
            </div>
          </div>
        </div>

        <div className="bg-bg p-6 rounded-2xl border-2 border-dashed border-brand/20">
          <h4 className="font-bold text-sm mb-4">Real-World Mapping</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-brand/5">
              <p className="text-xs font-bold mb-1">Fail-Fast in Payments</p>
              <p className="text-[10px] text-gray-500 italic">"If a transaction list is modified while we are calculating the total, we must stop immediately to prevent a wrong balance calculation."</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-brand/5">
              <p className="text-xs font-bold mb-1">Fail-Safe in Notifications</p>
              <p className="text-[10px] text-gray-500 italic">"We can safely add new recipients to a mailing list while the notification engine is already iterating through the existing ones."</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "collections-theory",
    title: "Collections Framework",
    category: "Java Core",
    icon: <List className="w-5 h-5" />,
    answer: (
      <div className="space-y-8">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">The Java Collections Framework is a unified architecture for storing and manipulating groups of objects. It provides high-performance implementations of data structures like lists, sets, and maps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <List className="w-5 h-5 text-brand" />
              1. List Interface
            </h4>
            <p className="text-xs text-gray-600 mb-4 italic">Ordered collection that allows duplicates.</p>
            <ul className="text-xs space-y-2 text-gray-700">
              <li>• <strong>ArrayList:</strong> Resizable array. Fast for random access (O(1)) but slow for insertions/deletions in the middle (O(n)).</li>
              <li>• <strong>LinkedList:</strong> Doubly linked list. Fast for insertions/deletions (O(1)) but slow for random access (O(n)).</li>
            </ul>
          </div>

          <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-brand" />
              2. Set Interface
            </h4>
            <p className="text-xs text-gray-600 mb-4 italic">Collection that contains no duplicate elements.</p>
            <ul className="text-xs space-y-2 text-gray-700">
              <li>• <strong>HashSet:</strong> Backed by HashMap. No guaranteed order. Allows one null element.</li>
              <li>• <strong>TreeSet:</strong> Sorted order (natural or custom). Does not allow null. O(log n) performance.</li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-brand rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Table className="w-5 h-5 text-brand" />
            3. Map Interface
          </h4>
          <p className="text-xs text-gray-600 mb-4 italic">Object that maps keys to values. Keys must be unique.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-bg rounded-lg">
              <p className="font-bold text-[10px] mb-1">HashMap</p>
              <p className="text-[9px] text-gray-500">Fastest, no order, allows one null key.</p>
            </div>
            <div className="p-3 bg-bg rounded-lg">
              <p className="font-bold text-[10px] mb-1">LinkedHashMap</p>
              <p className="text-[9px] text-gray-500">Maintains insertion order.</p>
            </div>
            <div className="p-3 bg-bg rounded-lg">
              <p className="font-bold text-[10px] mb-1">TreeMap</p>
              <p className="text-[9px] text-gray-500">Maintains sorted order of keys.</p>
            </div>
          </div>
        </div>

        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Interview Insight: ArrayList vs LinkedList
          </h4>
          <p className="text-xs opacity-80 leading-relaxed">
            "In most real-world scenarios, <strong>ArrayList</strong> is preferred over LinkedList because it has better cache locality and random access performance. LinkedList is only better if you are doing constant-time insertions/deletions at the ends of the list."
          </p>
        </div>
      </div>
    )
  },
  {
    id: "java-evolution",
    title: "Java Evolution (8-21)",
    category: "Java Core",
    icon: <FileCode className="w-5 h-5" />,
    answer: (
      <div className="space-y-10">
        <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-xl">
          <p className="font-medium">Java has evolved from a verbose language to a modern, functional, and highly scalable one. Understanding features from 8 to 21 is critical for modern <strong>Payment Gateway</strong> development.</p>
        </div>

        {/* Java 8 */}
        <div className="space-y-4">
          <h4 className="text-xl font-black text-brand flex items-center gap-2">
            <span className="bg-brand text-accent px-2 py-0.5 rounded text-sm">Java 8</span>
            The Functional Revolution 🔥
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-sm mb-2">Lambda & Streams</p>
              <p className="text-[10px] text-gray-600 mb-2">Process collections like a pro. Filter, map, and reduce with zero boilerplate.</p>
              <code className="block text-[9px] bg-bg p-2 rounded font-mono">
                payments.stream().filter(p -{">"} p {">"} 1000).collect(...)
              </code>
            </div>
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-sm mb-2">Optional & Date API</p>
              <p className="text-[10px] text-gray-600 mb-2">Kill NullPointerExceptions and handle timestamps properly for transactions.</p>
              <code className="block text-[9px] bg-bg p-2 rounded font-mono">
                Optional.ofNullable(user); LocalDateTime.now();
              </code>
            </div>
          </div>
        </div>

        {/* Java 9-17 */}
        <div className="space-y-4">
          <h4 className="text-xl font-black text-brand flex items-center gap-2">
            <span className="bg-brand text-accent px-2 py-0.5 rounded text-sm">Java 9-17</span>
            Modern Syntax & Safety
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-xs mb-1">var (J10)</p>
              <p className="text-[9px] text-gray-500">Local variable type inference.</p>
            </div>
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-xs mb-1">Records (J16)</p>
              <p className="text-[9px] text-gray-500">Immutable data classes for DTOs.</p>
            </div>
            <div className="p-4 bg-white border-2 border-brand rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-xs mb-1">Sealed (J17)</p>
              <p className="text-[9px] text-gray-500">Restrict class inheritance hierarchy.</p>
            </div>
          </div>
        </div>

        {/* Java 21 */}
        <div className="space-y-4">
          <h4 className="text-xl font-black text-brand flex items-center gap-2">
            <span className="bg-brand text-accent px-2 py-0.5 rounded text-sm">Java 21</span>
            High Scalability 🚀
          </h4>
          <div className="p-6 bg-accent border-2 border-brand rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h5 className="font-black text-lg mb-2">Virtual Threads (Project Loom)</h5>
            <p className="text-xs font-medium mb-4">Lightweight threads that allow handling millions of concurrent requests without blocking OS threads. Perfect for high-traffic payment gateways.</p>
            <div className="bg-white/50 p-3 rounded-xl font-mono text-[10px] border border-brand/20">
              Thread.startVirtualThread(() -{">"} processPayment());
            </div>
          </div>
        </div>

        {/* Real World Flow */}
        <div className="bg-brand text-white p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Modern Payment Flow (J8-21)
          </h4>
          <div className="space-y-3 text-[10px]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent text-brand rounded-full flex items-center justify-center font-black">1</div>
              <p><strong>Stream API:</strong> Filter incoming transaction batch.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent text-brand rounded-full flex items-center justify-center font-black">2</div>
              <p><strong>Optional:</strong> Handle potentially null user profile.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent text-brand rounded-full flex items-center justify-center font-black">3</div>
              <p><strong>Virtual Threads:</strong> Process 10k parallel bank API calls.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent text-brand rounded-full flex items-center justify-center font-black">4</div>
              <p><strong>Records:</strong> Store final immutable transaction state.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-bg rounded-xl border border-brand/5">
            <h4 className="font-bold text-sm mb-2 text-brand">Interview Key Points</h4>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>• <strong>Java 8:</strong> Functional programming foundation.</li>
              <li>• <strong>Java 17:</strong> Current LTS, focus on safety (Sealed/Records).</li>
              <li>• <strong>Java 21:</strong> Massive scalability with Virtual Threads.</li>
            </ul>
          </div>
          <div className="p-4 bg-bg rounded-xl border border-brand/5">
            <h4 className="font-bold text-sm mb-2 text-brand">Pro Tip</h4>
            <p className="text-xs text-gray-600 italic">"Always mention Virtual Threads when asked about Java 21. It's the biggest change in Java's concurrency model in 20 years."</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<"coding" | "theory">("coding");
  const [activeCodingId, setActiveCodingId] = useState(CODING_QUESTIONS[0].id);
  const [activeTheoryId, setActiveTheoryId] = useState(THEORY_QUESTIONS[0].id);

  const activeCoding = CODING_QUESTIONS.find(q => q.id === activeCodingId)!;
  const activeTheory = THEORY_QUESTIONS.find(q => q.id === activeTheoryId)!;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-brand px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-accent">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">InterviewPrep</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Master the Craft</p>
            </div>
          </div>

          <nav className="flex bg-bg p-1 rounded-xl border border-brand/10">
            <button
              onClick={() => setActiveSection("coding")}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                activeSection === "coding" ? "bg-brand text-white shadow-lg" : "text-gray-500 hover:text-brand"
              }`}
            >
              <Code2 className="w-4 h-4" />
              Interview Coding
            </button>
            <button
              onClick={() => setActiveSection("theory")}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                activeSection === "theory" ? "bg-brand text-white shadow-lg" : "text-gray-500 hover:text-brand"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Interview Theory Que
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-80 bg-white border-r-2 border-brand flex flex-col">
          <div className="p-6 border-b border-brand/10">
            <h2 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-4">
              {activeSection === "coding" ? "Coding Challenges" : "Theory Topics"}
            </h2>
            <div className="space-y-2">
              {activeSection === "coding" ? (
                CODING_QUESTIONS.map(q => (
                  <button
                    key={q.id}
                    onClick={() => setActiveCodingId(q.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                      activeCodingId === q.id 
                        ? "border-brand bg-accent/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                        : "border-transparent hover:border-brand/20 hover:bg-bg"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Code2 className={`w-5 h-5 ${activeCodingId === q.id ? "text-brand" : "text-gray-400"}`} />
                      <span className="font-bold text-sm">{q.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${activeCodingId === q.id ? "text-brand" : "text-gray-300"}`} />
                  </button>
                ))
              ) : (
                THEORY_QUESTIONS.map(q => (
                  <button
                    key={q.id}
                    onClick={() => setActiveTheoryId(q.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                      activeTheoryId === q.id 
                        ? "border-brand bg-accent/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                        : "border-transparent hover:border-brand/20 hover:bg-bg"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${activeTheoryId === q.id ? "text-brand" : "text-gray-400"}`}>
                        {q.icon}
                      </div>
                      <div>
                        <span className="font-bold text-sm block">{q.title}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">{q.category}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${activeTheoryId === q.id ? "text-brand" : "text-gray-300"}`} />
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="mt-auto p-6 bg-bg/50">
            <div className="p-4 bg-brand text-white rounded-xl">
              <p className="text-xs font-bold mb-2">Pro Tip</p>
              <p className="text-[10px] leading-relaxed opacity-70">
                {activeSection === "coding" 
                  ? "Scroll through the visualization to understand the internal state changes of the Stream API."
                  : "Try to explain these concepts in your own words before reading the answer."}
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-bg relative">
          <AnimatePresence mode="wait">
            {activeSection === "coding" ? (
              <motion.div
                key={`coding-${activeCodingId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pb-24"
              >
                <CodingView question={activeCoding} />
              </motion.div>
            ) : (
              <motion.div
                key={`theory-${activeTheoryId}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="p-6 md:p-12 max-w-4xl mx-auto"
              >
                <TheoryView question={activeTheory} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function CodingView({ question }: { question: CodingQuestion }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-[74px] left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
          <Play className="w-3 h-3 fill-accent text-accent" />
          Coding Visualization
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
          {question.title.split(":")[0]}
          <span className="text-accent bg-brand px-4 ml-2">{question.title.split(":")[1]}</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          {question.description}
        </p>
      </section>

      {/* Code Snippet */}
      <section className="px-6 max-w-4xl mx-auto mb-20">
        <div className="bg-white border-2 border-brand rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-brand p-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="ml-4 text-white/50 font-mono text-xs">Main.java</div>
          </div>
          <div className="p-8 font-mono text-sm md:text-base overflow-x-auto bg-[#1e1e1e] text-gray-300">
            <pre className="whitespace-pre">{question.fullCode}</pre>
          </div>
        </div>
      </section>

      {/* Scenes */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand/10 -translate-x-1/2 hidden md:block" />
        {question.scenes.map((scene, index) => (
          <Scene key={scene.id} scene={scene} index={index} />
        ))}
      </div>
    </div>
  );
}

function TheoryView({ question }: { question: TheoryQuestion }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-brand text-accent rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {React.cloneElement(question.icon as React.ReactElement, { className: "w-8 h-8" })}
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-accent bg-brand px-2 py-1 rounded mb-2 inline-block">
            {question.category}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">{question.title}</h2>
        </div>
      </div>

      <div className="bg-white border-2 border-brand rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <BookOpen className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-2 h-8 bg-accent rounded-full" />
            Detailed Answer
          </h3>
          <div className="prose prose-brand max-w-none text-gray-700 leading-relaxed">
            {question.answer}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold">Verified Interview Content</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-bg border border-brand/10 rounded-lg text-xs font-bold hover:bg-brand hover:text-white transition-colors">
              Mark as Learned
            </button>
            <button className="px-4 py-2 bg-bg border border-brand/10 rounded-lg text-xs font-bold hover:bg-brand hover:text-white transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </div>

      {/* Related Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 bg-white border-2 border-brand rounded-2xl hover:translate-y-[-4px] transition-transform cursor-pointer">
            <div className="w-8 h-8 bg-bg rounded-lg mb-4 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm mb-1">Related Topic {i}</h4>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Explore More</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const Scene: React.FC<{ scene: SceneData; index: number }> = ({ scene, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="min-h-screen flex items-center justify-center p-6 relative">
      <div className={`max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center ${isEven ? "" : "md:flex-row-reverse"}`}>
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={isEven ? "md:text-right" : "md:order-2"}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand text-accent mb-6 shadow-[4px_4px_0px_0px_#00FF00]`}>
            {scene.icon}
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{scene.title}</h3>
          <div className={`p-4 bg-white border-2 border-brand rounded-xl mb-6 inline-block font-mono text-sm font-bold ${isEven ? "md:ml-auto" : ""}`}>
            {scene.code}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            {scene.description}
          </p>
        </motion.div>

        {/* Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex items-center justify-center min-h-[300px] p-8 bg-white/50 rounded-3xl border-2 border-dashed border-brand/20 ${isEven ? "md:order-2" : ""}`}
        >
          <div className="w-full flex flex-wrap justify-center items-center gap-1">
            {scene.visual}
          </div>
        </motion.div>
      </div>

      {/* Scene Number Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20rem] font-bold">{index + 1}</span>
      </div>
    </section>
  );
};


