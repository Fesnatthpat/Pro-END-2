<template>
  <div class="w-full lg:h-[calc(100vh-125px)] lg:overflow-hidden flex flex-col lg:flex-row items-start gap-6 px-4 md:px-8">
    <!-- ฝั่งซ้าย (ส่วนหัวต้อนรับ) -->
    <div class="w-full lg:w-1/3 xl:w-1/4 lg:h-full flex flex-col">
      <div v-if="user" class="w-full lg:h-full">
        <div
          class="lg:h-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 lg:p-8 lg:pt-10 flex flex-col justify-start items-center gap-4 border border-gray-100 text-center lg:overflow-y-auto custom-scrollbar"
        >
          <div
            class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-indigo-50 border-4 border-white shadow-sm overflow-hidden shrink-0 flex items-center justify-center"
          >
            <img
              v-if="user.profileImage"
              :src="user.profileImage"
              alt="Profile"
              class="w-full h-full object-cover"
            />
            <i v-else class="bi bi-person-fill text-5xl lg:text-6xl text-indigo-200"></i>
          </div>
          <div class="w-full flex flex-col items-center">
            <h2 class="text-2xl font-bold text-[#1a1a40] mb-1">
              สวัสดีครับ,
              <div class="mt-1 text-xl">{{ user.fullname }}</div>
            </h2>
            <p class="text-slate-400 text-sm font-medium mb-4">รหัส: {{ user.username }}</p>
            
            <div class="inline-flex items-center justify-center gap-1 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100 mb-6">
              <i class="bi bi-shield-check text-[14px]"></i>
              <span>นักศึกษาปัจจุบัน</span>
            </div>

            <!-- Project Info Card -->
            <div class="w-full bg-indigo-900 rounded-[20px] p-5 shadow-lg text-white relative overflow-hidden text-left mt-auto">
              <i class="bi bi-braces absolute -right-4 -bottom-4 text-6xl opacity-10"></i>
              <h4 class="text-xs font-bold text-indigo-300 mb-3 uppercase tracking-wider">โครงงานของฉัน</h4>
              <p class="text-[14px] font-medium leading-relaxed mb-4 line-clamp-2">
                {{ project?.titleTh || 'ยังไม่ได้ยื่นเสนอโครงงาน' }}
              </p>
              
              <div v-if="project" class="space-y-3 pt-3 border-t border-indigo-800/50">
                <div class="space-y-1.5">
                  <div class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">สมาชิกในกลุ่ม</div>
                  <div class="text-[12px] text-indigo-100 flex items-center gap-2">
                    <i class="bi bi-person-circle"></i> {{ project.student1?.fullname }}
                  </div>
                  <div v-if="project.student2" class="text-[12px] text-indigo-100 flex items-center gap-2">
                    <i class="bi bi-person-circle"></i> {{ project.student2?.fullname }}
                  </div>
                </div>

                <div class="space-y-1.5">
                  <div class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">อาจารย์ที่ปรึกษา</div>
                  <div class="text-[12px] text-indigo-100 flex items-center gap-2">
                    <i class="bi bi-person-workspace"></i> {{ project.advisor?.fullname || '-' }}
                  </div>
                  <div v-if="project.coAdvisor" class="text-[12px] text-indigo-100 flex items-center gap-2">
                    <i class="bi bi-person-workspace text-indigo-300"></i> {{ project.coAdvisor?.fullname }}
                  </div>
                </div>
              </div>
              <div v-else class="text-xs text-indigo-300 italic">
                กรุณายื่นแบบขออนุมัติหัวข้อ (CP1)
              </div>
            </div>
            <!-- Contact Info -->
            <div class="w-full text-left mt-5 border-t border-slate-100 pt-5 space-y-4">
              <div class="flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div class="flex-grow">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">เบอร์โทรศัพท์</div>
                  <div class="text-slate-700 font-medium">{{ user.tel || '-' }}</div>
                </div>
              </div>

              <div class="flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                  <i class="bi bi-envelope-fill"></i>
                </div>
                <div class="flex-grow overflow-hidden">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">อีเมล</div>
                  <div class="text-slate-700 font-medium truncate">{{ user.email || '-' }}</div>
                </div>
              </div>

              <div class="flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[#06C755] shrink-0">
                  <i class="bi bi-line"></i>
                </div>
                <div class="flex-grow">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">LINE ID</div>
                  <div class="text-slate-700 font-medium">{{ user.lineId || '-' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ฝั่งขวา (สถานะการดำเนินงาน) -->
    <div class="w-full lg:w-2/3 xl:w-3/4 lg:h-full lg:overflow-hidden pr-2">
      <div
        v-if="isApproved"
        class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 md:p-8 w-full border border-gray-100 lg:h-full lg:flex lg:flex-col"
      >
        <div class="text-center md:text-left mb-8 border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 lg:shrink-0">
          <div>
            <h3 class="font-bold text-[24px] md:text-[28px] text-[#1a1a40] mb-2">
              สถานะการดำเนินงาน
            </h3>
            <p class="text-gray-500 text-sm">
              ติดตามความคืบหน้าโครงงานคอมพิวเตอร์ของคุณ
            </p>
          </div>
          
          <div class="w-full md:w-[300px] bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
            <div class="flex justify-between items-end mb-2">
              <span class="text-sm font-bold text-[#1a1a40]">ความคืบหน้าโดยรวม</span>
              <span class="text-xl font-bold text-blue-600">{{ projectPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" :style="`width: ${projectPercentage}%`"></div>
            </div>
          </div>
        </div>

        <div class="relative flex-1 flex flex-col min-h-0 pl-1 md:pl-4">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex flex-1 group"
          >
            <!-- Left Column: Circle & Line -->
            <div class="flex flex-col items-center w-[50px] shrink-0">
              <div
                class="w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[18px] border-2 z-10 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                :class="
                  step.isLocked
                    ? 'border-gray-200 bg-gray-50 text-gray-400'
                    : step.isCompleted
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-[#1a1a40] bg-[#1a1a40] text-white'
                "
              >
                <i v-if="step.isCompleted" class="bi bi-check-lg text-[24px]"></i>
                <span v-else>{{ step.id }}</span>
              </div>
              
              <!-- Dynamic Stretchable Line -->
              <div
                v-if="index !== steps.length - 1"
                class="w-[2px] flex-1 my-2 transition-colors duration-300 z-0 min-h-[70px]"
                :class="
                  step.isCompleted
                    ? 'bg-blue-600'
                    : 'bg-gray-200 group-hover:bg-gray-300'
                "
              ></div>
            </div>

            <!-- Right Column: Content -->
            <div 
              class="flex-grow ml-4 md:ml-8 flex flex-col" 
              :class="index !== steps.length - 1 ? 'pb-8 md:pb-4' : ''"
            >
              <div class="flex flex-col md:flex-row md:items-center justify-between min-h-[50px] bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none">
                <div
                  class="font-bold text-lg mb-3 md:mb-0 flex items-center gap-2"
                  :class="step.isLocked ? 'text-gray-400' : 'text-[#1a1a40]'"
                >
                  {{ step.title }}
                  <span 
                    class="text-xs font-semibold px-2.5 py-0.5 rounded-full" 
                    :class="step.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'"
                  >
                    {{ step.percentage }}%
                  </span>
                </div>

                <!-- แสดงข้อมูลนัดสอบสำหรับขั้นตอนที่ 1 (ถ้ามี) -->
                <div v-if="step.id === 1 && cp1Exam && !isCp1Passed" class="mb-4 md:mb-0 md:mr-6 flex-grow max-w-md animate-pulse">
                  <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <i class="bi bi-calendar-event"></i>
                    </div>
                    <div class="text-xs">
                      <div class="font-bold text-amber-800">นัดหมายสอบหัวข้อ</div>
                      <div class="text-amber-600">{{ formatDate(cp1Exam.examDate) }} | {{ cp1Exam.examTime || '-' }} น.</div>
                      <div class="text-amber-600 font-medium">สถานที่: {{ cp1Exam.examLocation || '-' }}</div>
                    </div>
                  </div>
                </div>

                <!-- แสดงข้อมูลนัดสอบสำหรับขั้นตอนอื่นๆ (ถ้ามี) -->
                <div v-if="step.examInfo" class="mb-4 md:mb-0 md:mr-6 flex-grow max-w-md animate-pulse">
                  <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <i class="bi bi-calendar-check"></i>
                    </div>
                    <div class="text-xs">
                      <div class="font-bold text-indigo-800">นัดหมายสอบจบโครงงาน</div>
                      <div class="text-indigo-600">{{ step.examInfo.date }} | {{ step.examInfo.time }} น.</div>
                      <div class="text-indigo-600 font-medium">สถานที่: {{ step.examInfo.location }}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-row items-center justify-between md:justify-end gap-4 md:gap-6"
                >
                  <div
                    class="text-[14px] md:text-[15px] font-medium min-w-[140px] md:text-right"
                    :class="step.statusColor"
                  >
                    {{ step.statusText }}
                  </div>

                  <div
                    v-if="step.isLocked"
                    class="w-[42px] h-[42px] rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 shadow-sm cursor-not-allowed shrink-0"
                  >
                    <i class="bi bi-lock-fill text-lg"></i>
                  </div>

                  <NuxtLink
                    v-else
                    :to="step.link"
                    class="w-[42px] h-[42px] rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0"
                    :class="
                      step.isCompleted
                        ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                        : 'border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white'
                    "
                  >
                    <i class="bi text-lg" :class="step.icon"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-8 md:p-[60px] w-full text-center lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center"
      >
        <div
          class="w-[100px] h-[100px] bg-[#fff3cd] text-[#ffc107] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <i class="bi bi-hourglass-split text-[50px]"></i>
        </div>
        <h3 class="font-bold text-[24px] text-[#1a1a40] mb-3">
          รอการอนุมัติจากผู้ดูแลระบบ
        </h3>
        <p class="text-[#6c757d] mb-8 leading-relaxed max-w-[500px] mx-auto">
          บัญชีของคุณกำลังรอการตรวจสอบจากแอดมิน<br />
          เมื่อได้รับการอนุมัติแล้ว
          คุณถึงจะสามารถเริ่มต้นยื่นเสนอหัวข้อและทำโครงงานได้ครับ
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

useHead({
  title: "สถานะการดำเนินงาน | โครงงานของฉัน",
});

// บังคับใช้ Layout ของนักศึกษา (สำคัญมากสำหรับปุ่ม Logout)
definePageMeta({
  layout: "student",
});

// ดึงข้อมูลผู้ใช้จาก Cookie
const userCookie = useCookie("user_session");
const user = computed(() => userCookie.value);

// ดึงข้อมูลโครงงานจริง
const { data: projectData, pending } = await useFetch(
  "/api/student/my-project",
  {
    query: { studentId: user.value?.id },
  },
);

const project = computed(() => projectData.value?.project);
const isApproved = computed(() => user.value?.isApproved);

// คำนวณสถานะจากฟิลด์ step ใน Database
const currentStep = computed(() => project.value?.step || 0);
const reportCount = computed(() => project.value?._count?.reports || 0);

// สำหรับ CP1 จะถือว่าผ่านเมื่อโปรเจกต์อยู่ Step 2 ขึ้นไป
const isCp1Passed = computed(() => currentStep.value >= 2);
const isProgressPassed = computed(() => currentStep.value >= 3); 
const isThesisPassed = computed(() => currentStep.value >= 4);

// สำหรับการสอบจบ จะถือว่าผ่านเมื่อโปรเจกต์ขยับไป Step 5 แล้ว
const isExamPassed = computed(() => currentStep.value >= 5);

// โครงงานสมบูรณ์ 100% เมื่ออยู่ Step 5 และสถานะคือ approved
const isProjectFinished = computed(() => currentStep.value === 5 && project.value?.status === 'approved');

const projectPercentage = computed(() => {
  if (!project.value) return 0;
  if (isProjectFinished.value) return 100;
  if (isExamPassed.value) return 80; // ผ่านสอบจบ แต่ยังไม่ Final submit
  if (isThesisPassed.value) return 60; // ส่งเล่มร่าง รอสอบ
  if (isProgressPassed.value) return 40; // ผ่านช่วงพัฒนา
  if (isCp1Passed.value) return 20; // ผ่านหัวข้อ
  return 0;
});

// Find active exams
const cp1Exam = computed(() => project.value?.exams?.find(e => e.type === 'CP1'))
const finalExam = computed(() => project.value?.exams?.find(e => e.type === 'CP2'))

// Helper สำหรับคำนวณสถานะ 2 และ 3
const getProgressStatus = () => {
  if (!isCp1Passed.value) return "รอผ่าน CP1";
  if (isProgressPassed.value) return "ผ่านแล้ว";
  return reportCount.value > 0 ? "กำลังดำเนินการ" : "รอดำเนินการ";
};

const getThesisStatus = () => {
  if (!isProgressPassed.value) return "รอผ่านขั้นตอนที่ 2";
  if (isThesisPassed.value) return "ผ่านแล้ว";
  return project.value?.thesisUrl ? "ส่งเล่มแล้ว/รอตรวจ" : "รอดำเนินการ";
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ================= คำนวณสถานะ 5 ขั้นตอน =================
const steps = computed(() => [
  {
    id: 1,
    percentage: 20,
    title: "ยื่นขอสอบหัวข้อ (CP1)",
    statusText: project.value
      ? isCp1Passed.value
        ? "สอบผ่านแล้ว"
        : project.value.status === 'approved' && project.value.step === 1
          ? "ผ่านการสอบหัวข้อแล้ว (รอเจ้าหน้าที่ยืนยัน)"
          : "กำลังดำเนินการ/รออนุมัติ"
      : "ยังไม่ได้เริ่มดำเนินการ",
    statusColor: isCp1Passed.value
      ? "text-green-600"
      : (project.value?.status === 'approved' && project.value?.step === 1)
        ? "text-emerald-600 font-bold"
        : project.value
          ? "text-blue-600"
          : "text-[#1a1a40]",
    icon: isCp1Passed.value ? "bi-eye" : "bi-pencil-square",
    link: "/student/cp1",
    isLocked: false,
    isCompleted: isCp1Passed.value,
  },
  {
    id: 2,
    percentage: 40,
    title: "พัฒนาโปรแกรม",
    statusText: getProgressStatus(),
    statusColor: isCp1Passed.value
      ? isProgressPassed.value
        ? "text-green-600"
        : "text-blue-600"
      : "text-gray-400",
    icon: isProgressPassed.value ? "bi-eye" : "bi-plus-lg",
    link: "/student/progress",
    isLocked: !isCp1Passed.value,
    isCompleted: isProgressPassed.value,
  },
  {
    id: 3,
    percentage: 60,
    title: "เล่มบัณฑิตนิพนธ์",
    statusText: getThesisStatus(),
    statusColor: isProgressPassed.value
      ? isThesisPassed.value
        ? "text-green-600"
        : "text-blue-600"
      : "text-gray-400",
    icon: isThesisPassed.value ? "bi-eye" : "bi-plus-lg",
    link: "/student/thesis",
    isLocked: !isCp1Passed.value,
    isCompleted: isThesisPassed.value,
  },

  {
    id: 4,
    percentage: 80,
    title: "ยื่นขอสอบจบ (CP2, CP3)",
    statusText: isThesisPassed.value
      ? isExamPassed.value
        ? "สอบผ่านแล้ว"
        : finalExam.value
          ? "กำหนดวันสอบแล้ว"
          : "คลิกเพื่อจัดการเอกสาร"
      : "รอผ่านขั้นตอนที่ 2 และ 3",
    statusColor: isThesisPassed.value
      ? isExamPassed.value
        ? "text-green-600"
        : finalExam.value
          ? "text-emerald-600 font-bold"
          : "text-blue-600"
      : "text-gray-400",
    icon: isExamPassed.value ? "bi-eye" : (finalExam.value ? "bi-calendar-check" : "bi-folder2-open"),
    link: "/student/exam-request",
    isLocked: !isThesisPassed.value,
    isCompleted: isExamPassed.value,
    examInfo: finalExam.value ? {
      date: formatDate(finalExam.value.examDate),
      time: finalExam.value.examTime,
      location: finalExam.value.examLocation
    } : null
  },

  {
    id: 5,
    percentage: 100,
    title: "ส่งเล่มและโปรแกรม",
    statusText: isExamPassed.value 
      ? (isProjectFinished.value ? "เสร็จสมบูรณ์" : "กำลังดำเนินการ") 
      : "รอผ่านสอบจบ (CP2)",
    statusColor: isProjectFinished.value 
      ? "text-green-600" 
      : isExamPassed.value 
        ? "text-blue-600" 
        : "text-gray-400",
    icon: isProjectFinished.value ? "bi-eye" : "bi-plus-lg",
    link: "/student/final-submit",
    isLocked: !isExamPassed.value,
    isCompleted: isProjectFinished.value,
  },
]);
</script>
