import { PYQQuestion } from "../types";

export const PAPER_A_QUESTIONS: PYQQuestion[] = [
  // DI (Q1 - Q5)
  {
    id: "2026-PA-Q1",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.1",
    questionNumInt: 1,
    passageText: `Comprehension: Answer the questions from 01 to 05 on the basis of information given below:
There is a firm which provides consultancy related to various areas like Education, Finance, Health, Social Media, Marriage and Others on the basis of applications received. The following table shows the percent of applications received for consultancy over time under different areas. The total number of applications received during Feb 2025 was larger than the number received in Apr 2025. The total number of applications received during Jan 2025 was larger than the number received in Mar 2025.

Table: Percentage of applications received:
Area | Jan 2025 | Feb 2025 | Mar 2025 | Apr 2025
Education | 38% | 33% | 19% | 17%
Finance | 25% | 30% | 37% | 45%
Health | 11% | 18% | 5% | 18%
Social Media | 5% | 3% | 10% | 6%
Marriage | 3% | 7% | 10% | 11%
Others | 18% | 9% | 19% | 3%
Total Percentage | 100% | 100% | 100% | 100%`,
    questionText: `SubQuestion No : 1
If the total number of applications received in Jan 2025 were double than the number of applications received in Feb 2025, then the applications received under area 'others' in Feb 2025 were how much percent of the applications received under the same area in Jan 2025?`,
    options: ["1. 200%", "2. 100%", "3. 50%", "4. 25%"],
    questionId: "55125118948",
    optionIds: ["55125173809", "55125173810", "55125173811", "55125173812"],
    chosenOption: "2",
    correctOption: "4",
    unitNumber: 7,
    unitTitle: "Unit 7 – Data Interpretation",
    topic: "Data Interpretation Calculations",
    subtopic: "Percentage & Ratio Calculations in Datasets",
    status: "classified",
  },
  {
    id: "2026-PA-Q2",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.2",
    questionNumInt: 2,
    passageText: `Comprehension: (Consultancy Applications Data Jan 2025 - Apr 2025)`,
    questionText: `SubQuestion No : 2
If the total number of applications received in Feb 2025 was less than number of applications received in Jan 2025 but more than that of in Mar 2025, then what will be the order of the months in terms of number of applications received?`,
    options: [
      "1. Apr > Mar > Feb > Jan",
      "2. Jan > Feb > Mar > Apr",
      "3. Jan > Feb > Apr > Mar",
      "4. can not be determined.",
    ],
    questionId: "55125118950",
    optionIds: ["55125173817", "55125173818", "55125173819", "55125173820"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 7,
    unitTitle: "Unit 7 – Data Interpretation",
    topic: "Data Interpretation Calculations",
    subtopic: "Comparative Growth, Trend Analysis & Proportion",
    status: "classified",
  },
  {
    id: "2026-PA-Q3",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.3",
    questionNumInt: 3,
    passageText: `Comprehension: (Consultancy Applications Data Jan 2025 - Apr 2025)`,
    questionText: `SubQuestion No : 3
If in the area of 'Social Media', the number of applications received in Jan 2025 was equal to the number of applications received in Mar 2025, then the total number of applications received under this area in Mar 2025 was ______ of the total number of applications received in Jan 2025.`,
    options: ["1. Exact Double", "2. Exact Half", "3. More than Half", "4. Less than Half"],
    questionId: "55125118949",
    optionIds: ["55125173813", "55125173814", "55125173815", "55125173816"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 7,
    unitTitle: "Unit 7 – Data Interpretation",
    topic: "Data Interpretation Calculations",
    subtopic: "Percentage & Ratio Calculations in Datasets",
    status: "classified",
  },
  {
    id: "2026-PA-Q4",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.4",
    questionNumInt: 4,
    passageText: `Comprehension: (Consultancy Applications Data Jan 2025 - Apr 2025)`,
    questionText: `SubQuestion No : 4
In the area of health, the number of applications received in Feb 2025 as compared to Apr 2025 was:`,
    options: ["1. Equal", "2. Larger", "3. Smaller", "4. Can not be determined"],
    questionId: "55125118947",
    optionIds: ["55125173805", "55125173806", "55125173807", "55125173808"],
    chosenOption: "1",
    correctOption: "2",
    unitNumber: 7,
    unitTitle: "Unit 7 – Data Interpretation",
    topic: "Data Interpretation Calculations",
    subtopic: "Comparative Growth, Trend Analysis & Proportion",
    status: "classified",
  },
  {
    id: "2026-PA-Q5",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.5",
    questionNumInt: 5,
    passageText: `Comprehension: (Consultancy Applications Data Jan 2025 - Apr 2025)`,
    questionText: `SubQuestion No : 5
In which area was the percentage of applications continuously increasing over time but at a continuously decreasing rate?`,
    options: ["1. Finance", "2. Health", "3. Marriage", "4. Others"],
    questionId: "55125118946",
    optionIds: ["55125173801", "55125173802", "55125173803", "55125173804"],
    chosenOption: "3",
    correctOption: "1",
    unitNumber: 7,
    unitTitle: "Unit 7 – Data Interpretation",
    topic: "Graphical Representation & Mapping",
    subtopic: "Table-Chart Interpretation",
    status: "classified",
  },
  // Q6 - Q50
  {
    id: "2026-PA-Q6",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.6",
    questionNumInt: 6,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Institutions):
A. Nalanda
B. Ujjain
C. Takshashila
D. Vallabhi

LIST-II (Known for):
I. Medicine and Arts
II. Hinyana Buddhism
III. Mahayana Buddhism and Secular Studies
IV. Physics and Astronomy

Choose the correct answer from the options given below:`,
    options: [
      "1. A-II, B-I, C-III, D-IV",
      "2. A-I, B-II, C-IV, D-III",
      "3. A-IV, B-III, C-I, D-II",
      "4. A-III, B-IV, C-I, D-II",
    ],
    questionId: "55125118990",
    optionIds: ["55125173977", "55125173978", "55125173979", "55125173980"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 10,
    unitTitle: "Unit 10 – Higher Education System",
    topic: "Ancient Indian Higher Learning",
    subtopic: "Ancient Universities & Centers of Learning (Takshashila, Nalanda, Vallabhi, Vikramshila, Odantapuri)",
    status: "classified",
  },
  {
    id: "2026-PA-Q7",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.7",
    questionNumInt: 7,
    questionText: `Select correct number sequences from the following:
A. 5, 7, 13, 25, 45, 75
B. 17, 40, 109, 224, 385
C. 4, 11, 19, 41, 79, 169
D. 3, 2, 0, -9, -52, -280
E. 4, 13, 31, 67, 139, 280

Choose the correct answer from the options given below:`,
    options: ["1. B, C only", "2. A, B only", "3. A, C only", "4. D, E only"],
    questionId: "55125118968",
    optionIds: ["55125173889", "55125173890", "55125173891", "55125173892"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 5,
    unitTitle: "Unit 5 – Mathematical Reasoning and Aptitude",
    topic: "Reasoning & Series",
    subtopic: "Number Series",
    status: "classified",
  },
  {
    id: "2026-PA-Q8",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.8",
    questionNumInt: 8,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Approach of Scale Construction):
A. Arbitrary approach
B. Factor Scales
C. Consensus approach
D. Cumulative Scales

LIST-II (Process Followed):
I. A panel evaluates the items chosen for inclusion in the instrument according to their relevance
II. Scale is developed on adhoc basis
III. Intercorrelation of items which indicates that a common factor accounts for the relationship between items
IV. Chosen on the basis of their conforming to some ranking of items with ascending or descending discriminating power.

Choose the correct answer from the options given below:`,
    options: [
      "1. A-III, B-II, C-I, D-IV",
      "2. A-II, B-III, C-I, D-IV",
      "3. A-II, B-III, C-IV, D-I",
      "4. A-III, B-II, C-IV, D-I",
    ],
    questionId: "55125118960",
    optionIds: ["55125173857", "55125173858", "55125173859", "55125173860"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 2,
    unitTitle: "Unit 2 – Research Aptitude",
    topic: "Steps of Research",
    subtopic: "Data Collection, Scaling and Measurement Tools",
    status: "classified",
  },
  {
    id: "2026-PA-Q9",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.9",
    questionNumInt: 9,
    questionText: `Arrange the steps of a research sequentially:
A. Writing Report
B. Data analysis
C. Review of literature
D. Choice of research design
E. Sampling and Data collection

Choose the correct answer from the options given below:`,
    options: [
      "1. E, D, A, C, B",
      "2. B, A, D, C, E",
      "3. E, B, D, C, A",
      "4. C, D, E, B, A",
    ],
    questionId: "55125118958",
    optionIds: ["55125173849", "55125173850", "55125173851", "55125173852"],
    chosenOption: "3",
    correctOption: "4",
    unitNumber: 2,
    unitTitle: "Unit 2 – Research Aptitude",
    topic: "Steps of Research",
    subtopic: "Formulation of Research Problem & Research Questions",
    status: "classified",
  },
  {
    id: "2026-PA-Q10",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.10",
    questionNumInt: 10,
    questionText: `Which of the following Pramanas (valid means of knowledge) are accepted by Nyaya school of philosophy?
1. Pratyaksha and Anumana only
2. Anumana and Verbal Testimony (Shabda) only
3. Pratyaksha and Upamana only
4. Pratyaksha, Anumana, Verbal Testimony (Shabda) and Upamana`,
    options: [
      "1. Pratyaksha and Anumana only",
      "2. Anumana and Verbal Testimony (Shabda) only",
      "3. Pratyaksha and Upamana only",
      "4. Pratyaksha, Anumana, Verbal Testimony (Shabda) and Upamana",
    ],
    questionId: "55125118971",
    optionIds: ["55125173901", "55125173902", "55125173903", "55125173904"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 6,
    unitTitle: "Unit 6 – Logical Reasoning",
    topic: "Indian Logic: Means of Knowledge (Pramanas)",
    subtopic: "Indian Philosophical Schools on Epistemology (Nyaya, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q11",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.11",
    questionNumInt: 11,
    questionText: `Planning teaching involves making decisions. Which of the following decision reflects this dictum?
1. Selection of the profession
2. Content selection and pedagogical methods
3. Selection of the course for admission
4. Planning to migrate abroad`,
    options: [
      "1. Selection of the profession",
      "2. Content selection and pedagogical methods",
      "3. Selection of the course for admission",
      "4. Planning to migrate abroad",
    ],
    questionId: "55125118951",
    optionIds: ["55125173821", "55125173822", "55125173823", "55125173824"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Teaching Concepts & Characteristics",
    subtopic: "Concept & Objectives of Teaching",
    status: "classified",
  },
  {
    id: "2026-PA-Q12",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.12",
    questionNumInt: 12,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Broken Rule):
A. Middle term undistributed in the premises.
B. Presence of two negative premises in an argument.
C. Particular conclusion with negative premises.
D. Any term distributed in conclusion but undistributed in premises.

LIST-II (Associated Fallacy):
I. Existential Fallacy
II. Fallacy of illicit major and minor term
III. Exclusive premises
IV. Undistributed Middle

Choose the correct answer from the options given below:`,
    options: [
      "1. A-I, B-II, C-III, D-IV",
      "2. A-II, B-I, C-IV, D-III",
      "3. A-IV, B-II, C-III, D-I",
      "4. A-IV, B-III, C-I, D-II",
    ],
    questionId: "55125118975",
    optionIds: ["55125173917", "55125173918", "55125173919", "55125173920"],
    chosenOption: "1",
    correctOption: "4",
    unitNumber: 6,
    unitTitle: "Unit 6 – Logical Reasoning",
    topic: "Structure of Arguments & Categorical Propositions",
    subtopic: "Formal and Informal Fallacies (Undistributed Middle, Begging Question, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q13",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.13",
    questionNumInt: 13,
    questionText: `Select characteristics of Learner Centered Approach:
A. It is centered on the needs of learner predecided by her parents
B. It lays emphasis on skills
C. It lays emphasis on indirect strategies.
D. It is dependent on the training teacher has gone through
E. It can be used in privately managed schools only

Choose the correct answer from the options given below:`,
    options: [
      "1. A and E only",
      "2. B and C only",
      "3. D and E only",
      "4. A, B, D and E only",
    ],
    questionId: "55125118954",
    optionIds: ["55125173833", "55125173834", "55125173835", "55125173836"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Methods of Teaching in Higher Learning",
    subtopic: "Teacher-Centred vs. Learner-Centred Methods",
    status: "classified",
  },
  {
    id: "2026-PA-Q14",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.14",
    questionNumInt: 14,
    questionText: `Which of the following are used as Social Networking Sites?
A. Twitter
B. Instagram
C. LinkedIn
D. Blackbox
E. Snapchat

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B only",
      "2. A, B, C only",
      "3. A, B, C, D only",
      "4. A, B, C, E only",
    ],
    questionId: "55125118979",
    optionIds: ["55125173933", "55125173934", "55125173935", "55125173936"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 8,
    unitTitle: "Unit 8 – Information and Communication Technology (ICT)",
    topic: "Internet & Networking Basics",
    subtopic: "Basics of Internet, Intranet, IP Addressing & Protocols (TCP/IP, UDP)",
    status: "classified",
  },
  {
    id: "2026-PA-Q15",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.15",
    questionNumInt: 15,
    questionText: `Arrange the following steps in the process of deduction:
A. Theory
B. Hypothesis
C. Data collection
D. Revision of theory
E. Findings

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B, C, E, D",
      "2. B, C, D, A, E",
      "3. E, B, C, A, D",
      "4. A, E, B, C, D",
    ],
    questionId: "55125118957",
    optionIds: ["55125173845", "55125173846", "55125173847", "55125173848"],
    chosenOption: "4",
    correctOption: "1",
    unitNumber: 2,
    unitTitle: "Unit 2 – Research Aptitude",
    topic: "Research Concepts & Approaches",
    subtopic: "Positivism and Post-Positivistic Approach to Research",
    status: "classified",
  },
  {
    id: "2026-PA-Q16",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.16",
    questionNumInt: 16,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Concept):
A. Algorithm
B. Modem
C. Bandwidth
D. Flowchart

LIST-II (Feature):
I. Range of frequencies over which signals are transmitted
II. Converts digital signals to sine waves and vice-versa
III. Pictorial representation of a computational procedure
IV. Finite sequence to solve a problem

Choose the correct answer from the options given below:`,
    options: [
      "1. A-IV, B-I, C-II, D-III",
      "2. A-IV, B-II, C-I, D-III",
      "3. A-II, B-IV, C-III, D-I",
      "4. A-II, B-III, C-IV, D-I",
    ],
    questionId: "55125118980",
    optionIds: ["55125173937", "55125173938", "55125173939", "55125173940"],
    chosenOption: "1",
    correctOption: "2",
    unitNumber: 8,
    unitTitle: "Unit 8 – Information and Communication Technology (ICT)",
    topic: "ICT Abbreviations & Terminology",
    subtopic: "General Computer Abbreviations (SSD, JPEG, HTML, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q17",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.17",
    questionNumInt: 17,
    questionText: `Select the CORRECT statements pertaining to NEP 2020:
A. It promotes secular and minorities education vehemently
B. It promotes multiple entry-multiple exit in higher education
C. It recommends that the state must spend 10 percent of GDP on education
D. It affirms that Sanskrit has more literature than Latin and Persian
E. It promotes private philanthropic education

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B and C",
      "2. C and D",
      "3. B, D and E",
      "4. A and E",
    ],
    questionId: "55125118988",
    optionIds: ["55125173969", "55125173970", "55125173971", "55125173972"],
    chosenOption: "1",
    correctOption: "3",
    unitNumber: 10,
    unitTitle: "Unit 10 – Higher Education System",
    topic: "Policies, Governance & Administration",
    subtopic: "National Education Policy (NEP 1986, NEP 2020)",
    status: "classified",
  },
  {
    id: "2026-PA-Q18",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.18",
    questionNumInt: 18,
    questionText: `The NPE 1986 envisaged setting up of residential schools with an aim of providing excellence coupled with equity and social justice. This led to the establishment of:
1. Kendriya Vidyalayas
2. Navyug Schools
3. Navodaya Vidyalayas
4. Eklavya Residential Schools`,
    options: [
      "1. Kendriya Vidyalayas",
      "2. Navyug Schools",
      "3. Navodaya Vidyalayas",
      "4. Eklavya Residential Schools",
    ],
    questionId: "55125118986",
    optionIds: ["55125173961", "55125173962", "55125173963", "55125173964"],
    chosenOption: "3",
    correctOption: "3",
    unitNumber: 10,
    unitTitle: "Unit 10 – Higher Education System",
    topic: "Policies, Governance & Administration",
    subtopic: "National Education Policy (NEP 1986, NEP 2020)",
    status: "classified",
  },
  {
    id: "2026-PA-Q19",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.19",
    questionNumInt: 19,
    questionText: `Which of the following, taken together, make a valid syllogism?
A. Apples are not sweets.
B. Some apples are sweets.
C. All sweets are tasty.
D. Some apples are not tasty.
E. No apple is tasty.

Choose the correct answer from the options given below:`,
    options: [
      "1. B, D, C only",
      "2. E, A, B only",
      "3. C, E, A only",
      "4. C, B, E only",
    ],
    questionId: "55125118974",
    optionIds: ["55125173913", "55125173914", "55125173915", "55125173916"],
    chosenOption: "2",
    correctOption: "3",
    unitNumber: 6,
    unitTitle: "Unit 6 – Logical Reasoning",
    topic: "Structure of Arguments & Categorical Propositions",
    subtopic: "Structure of Categorical Propositions & Standard Forms",
    status: "classified",
  },
  {
    id: "2026-PA-Q20",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.20",
    questionNumInt: 20,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Fuel Alcohol):
A. Methanol
B. Ethanol
C. Gasohol
D. Butanol

LIST-II (Characteristic):
I. Mixture of ethanol and gasoline
II. High energy content
III. Produced by bacterial anaerobic digestion
IV. Can be derived from potato waste

Choose the correct answer from the options given below:`,
    options: [
      "1. A-I, B-II, C-IV, D-III",
      "2. A-II, B-IV, C-I, D-III",
      "3. A-II, B-III, C-IV, D-I",
      "4. A-III, B-IV, C-I, D-II",
    ],
    questionId: "55125118985",
    optionIds: ["55125173957", "55125173958", "55125173959", "55125173960"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 9,
    unitTitle: "Unit 9 – People, Development and Environment",
    topic: "Energy Resources & Climate Change",
    subtopic: "Renewable Energy (Solar, Wind, Hydro, Geothermal, Biomass, Biofuels)",
    status: "classified",
  },
  {
    id: "2026-PA-Q21",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.21",
    questionNumInt: 21,
    questionText: `Working of the circulatory system of the human body is shown by a teacher on screen. Such simulations have tremendous potential for instructional purpose. This aligns best with-
1. Computer aided learning
2. Activity-based learning
3. Peer-tutoring
4. Heuristic-learning`,
    options: [
      "1. Computer aided learning",
      "2. Activity-based learning",
      "3. Peer-tutoring",
      "4. Heuristic-learning",
    ],
    questionId: "55125118952",
    optionIds: ["55125173825", "55125173826", "55125173827", "55125173828"],
    chosenOption: "1",
    correctOption: "1",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Teaching Support System",
    subtopic: "ICT Based Teaching Support & Simulations",
    status: "classified",
  },
  {
    id: "2026-PA-Q22",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.22",
    questionNumInt: 22,
    questionText: `Match the LIST-I with LIST-II:
LIST-I:
A. All real values of x satisfying (4x+1) < 13 and (x+1) > 3 lie in the interval
B. All real values of x satisfying 1 ≤ (x^2+1) < 5 lie in the interval
C. All real x satisfying (x+7) < (3x+1) < (x+9) lie in interval
D. All real x satisfying 5 < (4x-15) < 9 lie in interval

LIST-II:
I. (5, 6)
II. (3, 4)
III. (2, 3)
IV. (-2, 2)

Choose the correct answer from the options given below:`,
    options: [
      "1. A-III, B-IV, C-II, D-I",
      "2. A-I, B-II, C-III, D-IV",
      "3. A-II, B-I, C-III, D-IV",
      "4. A-IV, B-III, C-I, D-II",
    ],
    questionId: "55125118970",
    optionIds: ["55125173897", "55125173898", "55125173899", "55125173900"],
    chosenOption: "2",
    correctOption: "1",
    unitNumber: 5,
    unitTitle: "Unit 5 – Mathematical Reasoning and Aptitude",
    topic: "Mathematical Aptitude",
    subtopic: "Algebraic Expressions & Sequences",
    status: "classified",
  },
  {
    id: "2026-PA-Q23",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.23",
    questionNumInt: 23,
    questionText: `A term drawn from theology, concerned with the theory and method of the interpretation of human action, is known as:
1. Theological reasoning
2. Philosophy
3. Grounded theory
4. Hermeneutics`,
    options: [
      "1. Theological reasoning",
      "2. Philosophy",
      "3. Grounded theory",
      "4. Hermeneutics",
    ],
    questionId: "55125118956",
    optionIds: ["55125173841", "55125173842", "55125173843", "55125173844"],
    chosenOption: "1",
    correctOption: "4",
    unitNumber: 2,
    unitTitle: "Unit 2 – Research Aptitude",
    topic: "Methods of Research",
    subtopic: "Historical Research & Hermeneutics",
    status: "classified",
  },
  {
    id: "2026-PA-Q24",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.24",
    questionNumInt: 24,
    questionText: `Arrange the following computers in a chronological order:
A. The Atanasoff Berry Computer (ABC)
B. IBM-701
C. The Mark I Computer
D. UNIVAC I
E. IBM-650

Choose the correct answer from the options given below:`,
    options: [
      "1. C, D, A, E, B",
      "2. A, C, E, B, D",
      "3. A, C, E, D, B",
      "4. C, A, D, B, E",
    ],
    questionId: "55125118977",
    optionIds: ["55125173925", "55125173926", "55125173927", "55125173928"],
    chosenOption: "3",
    correctOption: "2",
    unitNumber: 8,
    unitTitle: "Unit 8 – Information and Communication Technology (ICT)",
    topic: "ICT Abbreviations & Terminology",
    subtopic: "Operating Systems & Number Systems (Binary, Octal, Hexadecimal)",
    status: "classified",
  },
  {
    id: "2026-PA-Q25",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.25",
    questionNumInt: 25,
    questionText: `Which of the following are methods of control on intervening variables?
A. Deductive manipulation
B. Inferential manipulation
C. Statistical manipulation
D. Physical manipulation
E. Selective manipulation

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B, C only",
      "2. B, C, D only",
      "3. C, D, E only",
      "4. E, A, B only",
    ],
    questionId: "55125118959",
    optionIds: ["55125173853", "55125173854", "55125173855", "55125173856"],
    chosenOption: "2",
    correctOption: "3",
    unitNumber: 2,
    unitTitle: "Unit 2 – Research Aptitude",
    topic: "Methods of Research",
    subtopic: "Experimental Research & Variable Control",
    status: "classified",
  },
  {
    id: "2026-PA-Q26",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.26",
    questionNumInt: 26,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Teaching Model):
A. Personal Basis Model
B. Social Interaction Model
C. Behaviour Altering Model
D. Information Development Model

LIST-II (Feature):
I. Working in a group
II. Teacher as the main figure in class
III. Memorization, practice and transfer of learning
IV. Instruction based on human relations

Choose the correct answer from the options given below:`,
    options: [
      "1. A-I, B-IV, C-II, D-III",
      "2. A-IV, B-I, C-II, D-III",
      "3. A-IV, B-III, C-I, D-II",
      "4. A-I, B-III, C-II, D-IV",
    ],
    questionId: "55125118955",
    optionIds: ["55125173837", "55125173838", "55125173839", "55125173840"],
    chosenOption: "3",
    correctOption: "2",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Teaching Concepts & Characteristics",
    subtopic: "Teaching Models & Instructional Theories",
    status: "classified",
  },
  {
    id: "2026-PA-Q27",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.27",
    questionNumInt: 27,
    questionText: `Select the correct statements in context of communication models:
A. Feedback is the transmission of receiver's reaction back to the sender
B. Encoding is the task/process done at receiver's end
C. Noise is anything that is added to the signal between its transmission and reception that is not intended by the source
D. Decoding is the task/process done at sender's end
E. Medium is the means through message is conveyed

Choose the correct answer from the options given below:`,
    options: [
      "1. C, D & E only",
      "2. B, D & E only",
      "3. A, B & C only",
      "4. A, C & E only",
    ],
    questionId: "55125118964",
    optionIds: ["55125173873", "55125173874", "55125173875", "55125173876"],
    chosenOption: "1",
    correctOption: "4",
    unitNumber: 4,
    unitTitle: "Unit 4 – Communication",
    topic: "Communication Meaning & Types",
    subtopic: "Meaning, Characteristics and Models of Communication (Shannon-Weaver, Two-Step Flow)",
    status: "classified",
  },
  {
    id: "2026-PA-Q28",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.28",
    questionNumInt: 28,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Scheme/Institution):
A. Rashtriya Avishkar Abhiyan
B. e-Pathshala
C. NAS
D. NTSE

LIST-II (Function):
I. Identification of talented students
II. Assessment of learning outcomes
III. To promote scientific temper and innovation
IV. Digital access to textbooks and resources

Choose the correct answer from the options given below:`,
    options: [
      "1. A-III, B-IV, C-II, D-I",
      "2. A-IV, B-III, C-I, D-II",
      "3. A-II, B-I, C-IV, D-III",
      "4. A-I, B-II, C-III, D-IV",
    ],
    questionId: "55125118989",
    optionIds: ["55125173973", "55125173974", "55125173975", "55125173976"],
    chosenOption: "1",
    correctOption: "1",
    unitNumber: 10,
    unitTitle: "Unit 10 – Higher Education System",
    topic: "Policies, Governance & Administration",
    subtopic: "Educational Schemes (PM-POSHAN, Samagra Shiksha, RUSA, Rashtriya Avishkar)",
    status: "classified",
  },
  {
    id: "2026-PA-Q29",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.29",
    questionNumInt: 29,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Actor):
A. Tom Hanks
B. Guru Dutt
C. Tom Cruise
D. Leonardo DiCaprio

LIST-II (Film):
I. Titanic
II. Forrest Gump
III. Pyaasa
IV. Mission Impossible

Choose the correct answer from the options given below:`,
    options: [
      "1. A-IV, B-III, C-I, D-II",
      "2. A-I, B-III, C-II, D-IV",
      "3. A-II, B-III, C-IV, D-I",
      "4. A-III, B-IV, C-I, D-II",
    ],
    questionId: "55125118965",
    optionIds: ["55125173877", "55125173878", "55125173879", "55125173880"],
    chosenOption: "3",
    correctOption: "3",
    unitNumber: 4,
    unitTitle: "Unit 4 – Communication",
    topic: "Mass-Media and Society",
    subtopic: "Mass Media Impact, Cinema, Press and Evolution",
    status: "classified",
  },
  {
    id: "2026-PA-Q30",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.30",
    questionNumInt: 30,
    questionText: `Match the LIST-I with LIST-II:
LIST-I (Letter- series):
A. Q, N, K, H, E, ?
B. O, B, L, ?, I, D, F, E, C
C. Z, U, Q, N, L, ?
D. A, C, ?, G, I

LIST-II (Missing letter):
I. C
II. K
III. B
IV. E

Choose the correct answer from the options given below:`,
    options: [
      "1. A-I, B-II, C-III, D-IV",
      "2. A-III, B-I, C-IV, D-II",
      "3. A-I, B-II, C-IV, D-III",
      "4. A-III, B-I, C-II, D-IV",
    ],
    questionId: "55125118969",
    optionIds: ["55125173893", "55125173894", "55125173895", "55125173896"],
    chosenOption: "4",
    correctOption: "4",
    unitNumber: 5,
    unitTitle: "Unit 5 – Mathematical Reasoning and Aptitude",
    topic: "Reasoning & Series",
    subtopic: "Letter Series & Alphabet Coding",
    status: "classified",
  },
  {
    id: "2026-PA-Q31",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.31",
    questionNumInt: 31,
    questionText: `Arrange the following industrial sources of noise in descending order as per their noise level (in dB):
A. Steel plate riveting
B. High speed drill
C. Circular saw
D. Farm tractor
E. Milling machine

Choose the correct answer from the options given below:`,
    options: [
      "1. B, A, D, C, E",
      "2. A, C, D, E, B",
      "3. D, B, A, E, C",
      "4. C, D, E, B, A",
    ],
    questionId: "55125118983",
    optionIds: ["55125173949", "55125173950", "55125173951", "55125173952"],
    chosenOption: "3",
    correctOption: "2",
    unitNumber: 9,
    unitTitle: "Unit 9 – People, Development and Environment",
    topic: "Environmental Pollution & Health Impacts",
    subtopic: "Noise Pollution & Decibel Levels of Industrial Sources",
    status: "classified",
  },
  {
    id: "2026-PA-Q32",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.32",
    questionNumInt: 32,
    questionText: `'A break in the chronology of a narrative in which events from the past are disclosed to reader, listener or viewer and which have a bearing on the present situation' can be easily noticed in cinema. What is this style?
1. Flash forward
2. Flash folk
3. Flashback
4. Flak`,
    options: ["1. Flash forward", "2. Flash folk", "3. Flashback", "4. Flak"],
    questionId: "55125118962",
    optionIds: ["55125173865", "55125173866", "55125173867", "55125173868"],
    chosenOption: "3",
    correctOption: "3",
    unitNumber: 4,
    unitTitle: "Unit 4 – Communication",
    topic: "Mass-Media and Society",
    subtopic: "Media Literacy, Advertising, and Narrative Techniques (Flashback, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q33",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.33",
    questionNumInt: 33,
    questionText: `SSD stands for:
1. Solid State Disk
2. Serial State Disk
3. Solid Stage Disk
4. Serial Stage Disk`,
    options: [
      "1. Solid State Disk",
      "2. Serial State Disk",
      "3. Solid Stage Disk",
      "4. Serial Stage Disk",
    ],
    questionId: "55125118976",
    optionIds: ["55125173921", "55125173922", "55125173923", "55125173924"],
    chosenOption: "2",
    correctOption: "1",
    unitNumber: 8,
    unitTitle: "Unit 8 – Information and Communication Technology (ICT)",
    topic: "ICT Abbreviations & Terminology",
    subtopic: "General Computer Abbreviations (SSD, JPEG, HTML, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q34",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.34",
    questionNumInt: 34,
    questionText: `E-learning strategies are supported by:
A. Virtual Classroom
B. TCP/IP
C. Instant messaging
D. Satellite classroom
E. Web casting

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B, C only",
      "2. C, D, E only",
      "3. A, C, E only",
      "4. A, D, C only",
    ],
    questionId: "55125118978",
    optionIds: ["55125173929", "55125173930", "55125173931", "55125173932"],
    chosenOption: "4",
    correctOption: "3",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Methods of Teaching in Higher Learning",
    subtopic: "Off-line vs. On-line Teaching Methods",
    status: "classified",
  },
  {
    id: "2026-PA-Q35",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.35",
    questionNumInt: 35,
    questionText: `The difference in sea-surface temperature between one location in the Western Indian Ocean and one location in the Eastern Indian Ocean is called:
1. Indian Ocean Dipole
2. Indian Ocean Oscillation
3. El Nino Southern Oscillation
4. Madden Julian Oscillation`,
    options: [
      "1. Indian Ocean Dipole",
      "2. Indian Ocean Oscillation",
      "3. El Nino Southern Oscillation",
      "4. Madden Julian Oscillation",
    ],
    questionId: "55125118981",
    optionIds: ["55125173941", "55125173942", "55125173943", "55125173944"],
    chosenOption: "1",
    correctOption: "1",
    unitNumber: 9,
    unitTitle: "Unit 9 – People, Development and Environment",
    topic: "Natural Hazards & Disasters",
    subtopic: "Geological, Hydro-Meteorological & Oceanic Hazards (Earthquakes, Dipoles)",
    status: "classified",
  },
  {
    id: "2026-PA-Q36",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.36",
    questionNumInt: 36,
    questionText: `As per Maslow's hierarchy of needs, arrange the following needs from basic to self fulfillment needs (Bottom to top):
A. Self actualization
B. Physiological needs
C. Belongingness and love needs
D. Safety needs
E. Esteem needs

Choose the correct answer from the options given below:`,
    options: [
      "1. B, D, C, E, A",
      "2. B, C, E, A, D",
      "3. A, B, D, C, E",
      "4. C, A, B, D, E",
    ],
    questionId: "55125118963",
    optionIds: ["55125173869", "55125173870", "55125173871", "55125173872"],
    chosenOption: "3",
    correctOption: "1",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Learner's Characteristics",
    subtopic: "Academic, Social, Emotional and Cognitive Characteristics",
    status: "classified",
  },
  {
    id: "2026-PA-Q37",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.37",
    questionNumInt: 37,
    questionText: `Arrange the following in increasing order:
A. True discount for the present worth of 5000 for a period of 4 months with rate of interest 9% per annum
B. True discount for the present worth of 8000 for a period of 3 months with rate of interest 8% per annum
C. True discount for the present worth of 6000 for a period of 6 months with rate of interest 6% per annum
D. True discount for the present worth of 7000 for a period of 4 months with rate of interest 7% per annum
E. True discount for the present worth of 9000 for a period of 6 months with rate of interest 5% per annum

Choose the correct answer from the options given below:`,
    options: [
      "1. C < A < D < B < E",
      "2. A < B < D < E < C",
      "3. B < A < D < C < E",
      "4. A < B < D < C < E",
    ],
    questionId: "55125118967",
    optionIds: ["55125173885", "55125173886", "55125173887", "55125173888"],
    chosenOption: "1",
    correctOption: "1",
    unitNumber: 5,
    unitTitle: "Unit 5 – Mathematical Reasoning and Aptitude",
    topic: "Mathematical Aptitude",
    subtopic: "Profit, Loss, and Discount / True Discount",
    status: "classified",
  },
  {
    id: "2026-PA-Q38",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.38",
    questionNumInt: 38,
    questionText: `In the first figure, which are the valid moods?
A. AAA
B. AEE
C. EAE
D. AOO
E. EIO

Choose the correct answer from the options given below:`,
    options: [
      "1. A, C, E only",
      "2. B, A, C only",
      "3. D, B, A only",
      "4. E, A, B only",
    ],
    questionId: "55125118973",
    optionIds: ["55125173909", "55125173910", "55125173911", "55125173912"],
    chosenOption: "2",
    correctOption: "1",
    unitNumber: 6,
    unitTitle: "Unit 6 – Logical Reasoning",
    topic: "Structure of Arguments & Categorical Propositions",
    subtopic: "Mood and Figure in Syllogisms",
    status: "classified",
  },
  {
    id: "2026-PA-Q39",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.39",
    questionNumInt: 39,
    questionText: `Per and Polyfluorinated alkyl substances are called Forever Chemicals which are highly persistent. They can be found in:
A. Paper and Cardboard food packaging
B. Textiles
C. DDT
D. Cosmetics
E. Nuclear Industry waste

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B, C only",
      "2. A, B, D only",
      "3. B, C, D only",
      "4. B, C, E only",
    ],
    questionId: "55125118984",
    optionIds: ["55125173953", "55125173954", "55125173955", "55125173956"],
    chosenOption: "4",
    correctOption: "2",
    unitNumber: 9,
    unitTitle: "Unit 9 – People, Development and Environment",
    topic: "Environmental Pollution & Health Impacts",
    subtopic: "Soil & Hazardous Waste (Forever Chemicals / PFAS, DDT)",
    status: "classified",
  },
  {
    id: "2026-PA-Q40",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.40",
    questionNumInt: 40,
    questionText: `The UGC has given a 10 point scale for grading. Arrange the following grades for highest to lowest performance:
A. F
B. P
C. O
D. A
E. Ab

Choose the correct answer from the options given below:`,
    options: [
      "1. B, A, D, E, C",
      "2. C, D, B, A, E",
      "3. A, D, C, B, E",
      "4. E, A, B, D, C",
    ],
    questionId: "55125118953",
    optionIds: ["55125173829", "55125173830", "55125173831", "55125173832"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 1,
    unitTitle: "Unit 1 – Teaching Aptitude",
    topic: "Evaluation Systems",
    subtopic: "Evaluation in Choice Based Credit System (CBCS) & 10-Point Scale",
    status: "classified",
  },
  {
    id: "2026-PA-Q41",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.41",
    questionNumInt: 41,
    questionText: `The ability to access, analyze, evaluate and communicate media messages is-
1. Narrative Setting
2. Propaganda
3. Media literacy
4. Media hype`,
    options: [
      "1. Narrative Setting",
      "2. Propaganda",
      "3. Media literacy",
      "4. Media hype",
    ],
    questionId: "55125118961",
    optionIds: ["55125173861", "55125173862", "55125173863", "55125173864"],
    chosenOption: "3",
    correctOption: "3",
    unitNumber: 4,
    unitTitle: "Unit 4 – Communication",
    topic: "Mass-Media and Society",
    subtopic: "Media Literacy, Advertising, and Narrative Techniques (Flashback, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q42",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.42",
    questionNumInt: 42,
    questionText: `Arrange the following in a meaningful order, from particular to general:
A. Family
B. Community
C. Member
D. Locality
E. Country

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B, C, D, E",
      "2. B, C, A, E, D",
      "3. C, A, B, D, E",
      "4. E, D, C, A, B",
    ],
    questionId: "55125118972",
    optionIds: ["55125173905", "55125173906", "55125173907", "55125173908"],
    chosenOption: "3",
    correctOption: "3",
    unitNumber: 6,
    unitTitle: "Unit 6 – Logical Reasoning",
    topic: "Evaluating Reasoning & Venn Diagrams",
    subtopic: "Evaluating Deductive and Inductive Reasoning",
    status: "classified",
  },
  {
    id: "2026-PA-Q43",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.43",
    questionNumInt: 43,
    questionText: `Arrange the following United Nations Conferences/Conventions according to the year they were held:
A. The Stockholm Conference
B. The Kyoto Protocol
C. Montreal Protocol
D. Vienna Convention for the protection of ozone layer
E. The Biodiversity Convention

Choose the correct answer from the options given below:`,
    options: [
      "1. A, B, C, D, E",
      "2. A, C, E, D, B",
      "3. A, D, C, E, B",
      "4. A, E, B, C, D",
    ],
    questionId: "55125118982",
    optionIds: ["55125173945", "55125173946", "55125173947", "55125173948"],
    chosenOption: "1",
    correctOption: "3",
    unitNumber: 9,
    unitTitle: "Unit 9 – People, Development and Environment",
    topic: "Environmental Policies & International Agreements",
    subtopic: "International Conventions (Stockholm, Vienna, Montreal, Rio, Kyoto, Paris, ISA)",
    status: "classified",
  },
  {
    id: "2026-PA-Q44",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.44",
    questionNumInt: 44,
    questionText: `Arrange the following chronologically:
A. University of Bombay, Calcutta and Madras
B. University Grants Commission
C. Panjab University, Lahore
D. Banaras Hindu University
E. University of Delhi

Choose the correct answer from the options given below:`,
    options: [
      "1. B, A, C, D, E",
      "2. A, C, D, E, B",
      "3. D, E, C, B, A",
      "4. A, B, C, D, E",
    ],
    questionId: "55125118987",
    optionIds: ["55125173965", "55125173966", "55125173967", "55125173968"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 10,
    unitTitle: "Unit 10 – Higher Education System",
    topic: "Evolution of Higher Learning Post-Independence",
    subtopic: "Chronological Development of Premier Universities & Regulatory Bodies (UGC, etc.)",
    status: "classified",
  },
  {
    id: "2026-PA-Q45",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.45",
    questionNumInt: 45,
    questionText: `A computer costs 50,000 Rupees and printer costs 20,000 Rupees. In a sale, the price of computer is reduced by 17% and that of printer is reduced by x%. If a person purchased both the printer and the computer with a total cost of 50,000 rupees, then the value of x is-
1. 57.5
2. 52.5
3. 33
4. 66`,
    options: ["1. 57.5", "2. 52.5", "3. 33", "4. 66"],
    questionId: "55125118966",
    optionIds: ["55125173881", "55125173882", "55125173883", "55125173884"],
    chosenOption: "1",
    correctOption: "1",
    unitNumber: 5,
    unitTitle: "Unit 5 – Mathematical Reasoning and Aptitude",
    topic: "Mathematical Aptitude",
    subtopic: "Profit, Loss, and Discount / True Discount",
    status: "classified",
  },
  // Comprehension (Q46 - Q50)
  {
    id: "2026-PA-Q46",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.46",
    questionNumInt: 46,
    passageText: `Comprehension:
Perhaps the best known of these sociologists is Oliver (1990), who argues that the biomedical model of disability leads to what he calls an ideology of personal tragedy which stresses the need for the individual disabled person to come to terms with 'their' problem, by struggling to cope as best they can.

Oliver calls this the personal tragedy model because it tends to describe disability as some terrible personal problem, which has ruined that person's life. He suggests that this model has now become taken for granted, achieving 'ideological hegemony' in the way that disabled people are viewed.

In place of the individualistic or personal tragedy model, Oliver argues that disability should be seen as a social problem and that it can only be understood within a wider social and economic framework, that is, within a social model.

Oliver argues that a clear distinction can be made between impairment and disability. A person may have a physical impairment of some kind, but it only becomes a disability when society organises social and economic features in such a way as to translate the impairment into a disability. For example, if the only means to enter a cinema is by using steps, then a person who has an impairment which leads them to use a wheelchair becomes disabled. However, if a ramp is provided and the ticket booth is at a lower height, and adequate spaces are provided for wheelchair users, then the person is no longer disabled. So, disability derives from organising society in such a way as to change impairment into disability.`,
    questionText: `SubQuestion No : 46
Oliver argues that disability is a social problem because:
1. It is a divine curse to be suffered by the society.
2. Physical impairment translates into disability due to social and economic structures.
3. Individual as a part of society has gone through personal tragedy.
4. Impairment and disability are one and the same.`,
    options: [
      "1. It is a divine curse to be suffered by the society.",
      "2. Physical impairment translates into disability due to social and economic structures.",
      "3. Individual as a part of society has gone through personal tragedy.",
      "4. Impairment and disability are one and the same.",
    ],
    questionId: "55125118992",
    optionIds: ["55125173981", "55125173982", "55125173983", "55125173984"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 3,
    unitTitle: "Unit 3 – Comprehension",
    topic: "Reading Comprehension",
    subtopic: "Passage Analysis & Direct Fact Retrieval",
    status: "classified",
  },
  {
    id: "2026-PA-Q47",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.47",
    questionNumInt: 47,
    passageText: `Comprehension: (Disability Models - Oliver 1990)`,
    questionText: `SubQuestion No : 47
The clear distinction between impairment and disability is:
1. Impairment is physical whereas disability is a mental problem.
2. Impairment is personal whereas disability is social.
3. Impairment can be treated medically and disability can not be cured.
4. Impairment is inaccessibility to social spaces whereas disability is fair access to every social space.`,
    options: [
      "1. Impairment is physical whereas disability is a mental problem.",
      "2. Impairment is personal whereas disability is social.",
      "3. Impairment can be treated medically and disability can not be cured.",
      "4. Impairment is inaccessibility to social spaces whereas disability is fair access to every social space.",
    ],
    questionId: "55125118995",
    optionIds: ["55125173993", "55125173994", "55125173995", "55125173996"],
    chosenOption: "4",
    correctOption: "2",
    unitNumber: 3,
    unitTitle: "Unit 3 – Comprehension",
    topic: "Reading Comprehension",
    subtopic: "Contextual Inference & Author's Argument",
    status: "classified",
  },
  {
    id: "2026-PA-Q48",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.48",
    questionNumInt: 48,
    passageText: `Comprehension: (Disability Models - Oliver 1990)`,
    questionText: `SubQuestion No : 48
Disability can be done away by:
1. Giving adequate medical treatment to everyone.
2. Reorganizing society to facilitate access of all social space to the impaired.
3. By re-orienting disabled persons.
4. By re-orienting parents to prevent birth of disabled children.`,
    options: [
      "1. Giving adequate medical treatment to everyone.",
      "2. Reorganizing society to facilitate access of all social space to the impaired.",
      "3. By re-orienting disabled persons.",
      "4. By re-orienting parents to prevent birth of disabled children.",
    ],
    questionId: "55125118994",
    optionIds: ["55125173989", "55125173990", "55125173991", "55125173992"],
    chosenOption: "2",
    correctOption: "2",
    unitNumber: 3,
    unitTitle: "Unit 3 – Comprehension",
    topic: "Reading Comprehension",
    subtopic: "Passage Analysis & Direct Fact Retrieval",
    status: "classified",
  },
  {
    id: "2026-PA-Q49",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.49",
    questionNumInt: 49,
    passageText: `Comprehension: (Disability Models - Oliver 1990)`,
    questionText: `SubQuestion No : 49
Oliver rebuts personal tragedy model because:
1. It is an accident that makes one impaired, not a willful choice.
2. In society, disability is a taboo.
3. It sees disability as an individualistic problem that disrupts one's life.
4. It is not the willingness of God to make someone disabled.`,
    options: [
      "1. It is an accident that makes one impaired, not a willful choice.",
      "2. In society, disability is a taboo.",
      "3. It sees disability as an individualistic problem that disrupts one's life.",
      "4. It is not the willingness of God to make someone disabled.",
    ],
    questionId: "55125118993",
    optionIds: ["55125173985", "55125173986", "55125173987", "55125173988"],
    chosenOption: "3",
    correctOption: "3",
    unitNumber: 3,
    unitTitle: "Unit 3 – Comprehension",
    topic: "Reading Comprehension",
    subtopic: "Contextual Inference & Author's Argument",
    status: "classified",
  },
  {
    id: "2026-PA-Q50",
    year: "2026",
    paperId: "2026-paper-a",
    paperName: "2026 Paper A",
    paperSubject: "87 Computer Science and Applications",
    testDate: "22/06/2026",
    testTime: "3:00 PM - 6:00 PM",
    questionNumber: "Q.50",
    questionNumInt: 50,
    passageText: `Comprehension: (Disability Models - Oliver 1990)`,
    questionText: `SubQuestion No : 50
The society organizes social and economic features in such a way that:
1. Enabled bodied are more intelligent citizens.
2. Impairment translates into quality of social adjustment of everyone.
3. Accessing social space becomes a challenge for the impaired.
4. Impaired people must be provided everything within their residence.`,
    options: [
      "1. Enabled bodied are more intelligent citizens.",
      "2. Impairment translates into quality of social adjustment of everyone.",
      "3. Accessing social space becomes a challenge for the impaired.",
      "4. Impaired people must be provided everything within their residence.",
    ],
    questionId: "55125118996",
    optionIds: ["55125173997", "55125173998", "55125173999", "55125174000"],
    chosenOption: "2",
    correctOption: "3",
    unitNumber: 3,
    unitTitle: "Unit 3 – Comprehension",
    topic: "Reading Comprehension",
    subtopic: "Vocabulary in Context & Main Idea Synthesis",
    status: "classified",
  },
];
