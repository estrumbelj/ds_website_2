---
title: "Announcing the 2026 Project competition topics"
date: 2026-01-15
draft: false
type: "competition"
---

### Topics for the 2026 Project competition
------

------

#### In516ht

------

In516ht is a specialized data consulting and solutions firm that focuses on big data analytics, business intelligence, and cloud data warehousing. Based in Slovenia with a global reach, they are a premier snowflake partner and assist enterprises with data migration, modernization, and the implementation of advanced predictive analytics to drive better business decision-making. Projects below are prepared in collaboration with Emirates Insurance, one of the pioneering insurance companies in the middle east region.

**AI-powered intelligent quote intake**

In the commercial insurance world, brokers send submissions—packages containing emails, complex pdfs, excel spreadsheets (schedules of values), and legal contracts. Currently, these are manually reviewed to identify key risk factors. This project focuses on building an end-to-end information extraction system. Using natural language processing (NLP), you will extract critical entities such as industry types, coverage limits, and risk locations. The system must go beyond simple extraction; it needs to flag missing data and auto-populate risk fields. You will begin with workmen's compensation insurance, analyzing a two-month dataset of actual broker communications to train models that can distinguish between standard clauses and unique endorsements. This is a classic unstructured-to-structured data challenge with a potential high real-world impact on operational efficiency.

Keywords: data fusion, natural language processing, named entity recognition, document intelligence

**AI underwriting assistant chatbot**

Underwriting is the process of evaluating how risky a potential client is and determining the correct price (premium). To do this, underwriters must navigate a massive library of product manuals, reinsurance treaties (contracts where emirates insurance transfers some risk to other companies), and specific legal clauses. You will develop an AI assistant that allows underwriters to query this internal knowledge base using natural language. For example, an underwriter might ask, "What is the specific clause required for demolition risk in a construction policy?", the bot must then search across multiple technical documents, summarize the relevant rules, and recommend rating factors (the variables used to calculate price). The challenge lies in ensuring high factual accuracy and grounding the AI's responses strictly within the official company manuals to prevent hallucinations in a regulated environment.

Keywords: large language models, retrieval-augmented generation, vector databases, semantic search, knowledge management

**Broker scoring & predictive analytics**

Emirates Insurance works with various brokers who bring in business. However, not all brokers are equal in terms of profitability or growth. This project is a predictive modeling challenge where you will build a scoring engine to evaluate broker performance. You will analyze three main dimensions: quality of submissions (how complete and accurate their data is), loss ratio performance (the ratio of claims paid out versus premiums collected), and growth potential. Using historical time-series data, you will build models to predict which brokers are likely to see a decline in volume and identify cross-selling opportunities (e.g., if a broker provides great motor insurance but hasn't yet used our property insurance products). This project involves feature engineering, trend analysis, and creating a "broker health score" to guide the sales team's strategy.

Keywords: predictive modeling, time-series analysis, performance scoring, business intelligence

------
#### Medius
------

Medius is an award-winning Slovenian software engineering company and technology solutions provider that helps companies achieve higher business impact through innovative, data-driven approaches. Medius specializes in facilitating machine learning and data science to solve complex, non-standard problems.

**Optimizing manufacturing processes with explainable AI**

This project was prepared in collaboration with the Elrad International Group, a global electronic manufacturing services provider that delivers comprehensive development and mass production solutions across three continents. The project focuses on AI-empowered manufacturing process optimization from vast amounts of Elrad's precise, tabular measurement data across multiple stages of the manufacturing lifecycle. While the data is precise, the sheer volume and complexity make it difficult to determine how specific parameter combinations influence the overall efficiency. Your task is to use this multi-stage tabular dataset to develop solutions that directly aid human operators in the manufacturing process and potentially help identify systemic issues within the manufacturing process itself. Your tasks will be to build a high-performing predictive model to forecast process outcomes based on the multi-stage logs, to apply explainable ai (XAI) techniques to identify exactly which parameters (features) are driving process deviations, helping humans verify the model's logic, and to compare complex black box approaches against highly interpretable models to demonstrate the trade-offs in performance vs. utility.

Keywords: process optimization, explainable AI, high-dimensional tabular data, smart manufacturing, root cause analysis, model benchmarking

-------
#### Teads
-------

Teads is a global media and advertising technology platform that specializes in digital advertising. The company provides an omnichannel platform that connects premium publishers with top-tier brands, using predictive AI to optimize ad creative and placement across mobile and web.

**Visual attribute extraction via constrained local vision-language models**

Integrating high-dimensional visual modalities that are common in digital advertising into click-through rate (CTR) prediction models (e.g., Deep & Cross Network v2, DCNV2) remains non-trivial due to the model's reliance on discrete feature interactions. This project explores a method to bridge this gap by utilizing local vision-language models (VLMs) to distill raw imagery into dense, multi-value categorical sets (e.g., fine-grained taxonomy classification). Unlike embedding-based approaches, this task requires enforcing strict output alignment with pre-defined feature vocabularies to ensure compatibility with the explicit cross-network layers of DCNV2. Students must address the specific optimization challenge of grammar-constrained decoding, utilizing techniques such as finite-state machine (FSM) guidance during the logit generation phase to guarantee schema compliance without costly fine-tuning. This work highlights the trade-offs between inference latency and attribute precision on consumer-grade hardware, aiming to produce robust, interpretable feature inputs that enhance interaction modeling in a sparse domain.

Keywords: digital advertising, deep learning, click-through rate prediction, big data, vision-language models

**Optimizing batch prompting for inference in low-resource local large language models**

Batch prompting significantly enhances large language model (LLM) inference efficiency by aggregating multiple distinct queries into a single context window, thereby amortizing the computational cost of system instructions across a single forward pass. However, applying this paradigm to small-scale, local architectures (e.g., < 10b parameters) introduces distinct challenges regarding representational stability and resource management. This project investigates the optimization of batch prompt strategies on consumer-grade hardware, where students must address the non-trivial trade-off between throughput and accuracy. Primary obstacles include the lost-in-the-middle phenomenon, where low-capacity models exhibit degradation in attending to mid-sequence queries, and the hardware limits of local VRAM. Students are tasked with devising implementation strategies that maximize token throughput while mitigating the risks of context saturation and KV-cache exhaustion inherent to limited-resource environments.

Keywords: digital advertising, deep learning, big data, large language models, hardware limitations

-------
#### PredictLeads
-------

PredictLeads is a business intelligence data provider that tracks company growth and buying intent signals by analyzing millions of public sources. Their platform extracts structured data on job openings, technology adoption, and news events to help sales teams, venture capitalists, and quantitative funds identify high-potential leads and monitor market shifts in real-time.

**Detecting and extracting multiple logos from a single image**

Marketing materials, event posters, and our partners sections on websites often feature a single composite image containing a collage of company logos. To identify all business relationships, it is necessary to transition from this composite image to individual logos. This requires precise object detection to ensure logos are correctly bounded and separated without losing important visual details or including parts of neighboring logos. The main goal of the project is to implement a pipeline that can automatically detect, localize, and crop individual logos from an image. The solution should be robust enough to handle low-resolution images and maintain the aspect ratio of the extracted logos. Students will be provided with a dataset of composite images and a dataset of logos.

Keywords: computer vision, object detection, image segmentation, business relationships

**Extracting company news from podcasts**

Podcasts have become an important medium for business leaders to share insights, announce strategic shifts, and discuss market trends. However, the unstructured and conversational nature of audio makes it difficult to monitor for specific business intelligence. Manually listening to hours of content is infeasible, creating a need for automated systems that can process spoken dialogue and distill it into actionable summaries. The main goal of the project is to develop a system that processes audio recordings in order to identify and extract significant news related to specific companies. This involves a multi-stage pipeline: converting speech to text with high accuracy, identifying company mentions, and classifying the news. The challenge lies in filtering out casual mentions and noise while maintaining the original sentiment and factual accuracy of the spoken information. A part of the project will also be to compile a set of audio recordings for testing.

Keywords: podcasts, speech-to-text, natural language processing, information extraction

**Quantifying and tracking changes in company landing pages**

Tracking how a company's landing page evolves over time provides critical insights. While simple "diffing" tools exist, they often fail to distinguish between minor UI tweaks and meaningful shifts in the business strategy. Identifying when a company fundamentally changes its messaging allows for automated monitoring of market trends and competitive landscapes at scale. The main goal of the project is to develop a methodology for quantifying the magnitude of change between snapshots of website landing pages. Using a dataset of markdown content from 3,000 websites across three monthly snapshots, the goal is to implement a scoring system to represent the significance of content updates. Furthermore, the system should highlight changes in a git-like fashion to pinpoint exactly what was added or removed. The ultimate goal is to trigger deeper LLM-based analysis when meaningful change is detected.

Keywords: text similarity, document versioning, change detection, llm analysis

**Location extraction from job descriptions**

Accurately identifying where a job is located is very important for labor market analytics. While many job postings have a dedicated location field, the actual work locations are frequently buried within the unstructured text of the job description. Extracting these locations at scale is challenging because geographical entities can be ambiguous and the context of the mention is crucial for accuracy. The main goal of the project is to develop a high-performance model that extracts one or more specific work locations from a job description. Because the system must process millions of postings efficiently, a primary focus is on cost-effectiveness. While large language models (LLMs) may offer high accuracy, their computational cost is often prohibitive for processing such high volumes. Students will explore optimized approaches, such as fine-tuned small language models or hybrid heuristic-statistical methods to achieve high precision at a fraction of the cost.

Keywords: information extraction, geographic entity resolution, cost-efficient nlp, scalable machine learning


------
#### DS@FRI
------

**Slovenian-Language OCR Benchmark (in collaboration with Valira.ai)**

This project aims to lay the groundwork for an OCR benchmark for Slovenian language, providing a fair, transparent, and reproducible framework for evaluating emerging vision-language models (VLMs) and other OCR systems. The first step is to identify the specific tasks to include (text recognition, handwriting recognition, table extraction, document layout analysis etc.), and determining the metrics for evaluation. The benchmark can utilize either synthetic datasets or build upon existing resources, such as Šolar or KAS. Both traditional OCR systems (EasyOCR, Tesseract) and newer, emerging solutions (GPT, Gemini, Deepseek OCR, Mistral OCR) should be included in the evaluation.

Keywords: vision-language models, natural language processing, benchmark, dataset preparation