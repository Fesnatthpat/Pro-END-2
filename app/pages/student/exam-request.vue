<template>
  <div class="min-h-screen py-8 px-4 bg-[#f8f9fa] dark:bg-slate-900">
    <div class="max-w-[900px] mx-auto w-full">

      <!-- Header Section -->
      <div
        class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-[fadeIn_0.5s_ease-out]">
        <div>
          <NuxtLink to="/student"
            class="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all mb-3 font-bold text-sm group">
            <span class="material-symbols-rounded group-hover:-translate-x-1 transition-transform">arrow_back</span>
            กลับหน้าหลัก
          </NuxtLink>
          <h2 class="md: text-[#1a1a40] dark:text-white leading-tight tracking-tight text-2xl md:text-3xl font-bold">
            คำร้องขอสอบจบโครงงาน
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            ขั้นตอนการประเมินผลสัมฤทธิ์ของโครงงานคอมพิวเตอร์
          </p>
        </div>
        <div class="shrink-0 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span class="material-symbols-rounded">school</span>
          </div>
          <div>
            <div class="text-xs font-black text-slate-400 uppercase tracking-widest">สถานะปัจจุบัน</div>
            <div class="text-sm font-black text-slate-700 dark:text-slate-300">{{ getProjectStepStatus() }}</div>
          </div>
        </div>
      </div>

      <!-- Main Status Card -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-sm mb-10 max-w-3xl mx-auto relative animate-[fadeIn_0.5s_ease-out]">
        
        <div v-if="finalExam">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-slate-700">
            <div class="mb-4 md:mb-0">
              <h3 class="text-xl font-bold text-[#1a1a40] dark:text-white">ตารางการสอบถูกกำหนดแล้ว</h3>
              <p class="text-sm text-gray-500 dark:text-slate-400">เจ้าหน้าที่ยืนยันวันเวลาสอบเรียบร้อยแล้ว</p>
            </div>
            <div class="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-auto">
              <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              Confirmed
            </div>
          </div>

          <div class="space-y-4">            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-blue-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                  <span class="material-symbols-rounded">calendar_month</span>
                </div>
                <div>
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">วันที่สอบ</div>
                  <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ formatDate(finalExam.examDate) }}</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-amber-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                  <span class="material-symbols-rounded">schedule</span>
                </div>
                <div>
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">เวลาเริ่มต้น</div>
                  <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ finalExam.examTime }} น.</div>
                </div>
              </div>
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
              <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-rose-600 shadow-sm flex items-center justify-center text-2xl shrink-0">
                <span class="material-symbols-rounded">location_on</span>
              </div>
              <div class="flex-grow">
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">สถานที่/ห้องสอบ</div>
                <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ finalExam.examLocation }}</div>
              </div>
              <NuxtLink to="/student/cp3" class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1a1a40] text-white font-bold text-sm hover:bg-indigo-600 transition-all shadow-md mt-4 md:mt-0">
                <span class="material-symbols-rounded text-base">print</span> พิมพ์ใบ CP3
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="relative z-10">
          <!-- Passed State -->
          <div v-if="project?.step >= 5" class="text-center py-8 animate-[fadeIn_0.6s_ease-out]">
            <div class="relative w-32 h-32 mx-auto mb-8">
              <div class="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
              <div
                class="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-emerald-200 dark:shadow-none">
                <span class="material-symbols-rounded text-6xl">verified</span>
              </div>
            </div>
            <h3 class="text-[#1a1a40] dark:text-white mb-4 text-xl md:text-2xl font-bold">ผ่านการสอบจบเรียบร้อยแล้ว</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-[500px] mx-auto mb-10 text-lg leading-relaxed">
              ขอแสดงความยินดีด้วย! คุณผ่านขั้นตอนการสอบจบแล้ว
              ขั้นตอนสุดท้ายคือการส่งเล่มวิทยานิพนธ์และโปรแกรมฉบับสมบูรณ์เข้าสู่ระบบครับ
            </p>
            <NuxtLink to="/student/final-submit"
              class="inline-flex items-center gap-3 px-12 py-5 bg-[#1a1a40] text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 dark:shadow-none hover:-translate-y-1 active:scale-95 group">
              ไปหน้าส่งงานฉบับสมบูรณ์
              <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform">rocket_launch</span>
            </NuxtLink>
          </div>

          <!-- Pending Scheduling State -->
          <div v-else-if="project?.step === 4" class="animate-[fadeIn_0.6s_ease-out]">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-slate-700">
              <div class="mb-4 md:mb-0">
                <h3 class="text-xl font-bold text-[#1a1a40] dark:text-white">คำร้องขอสอบจบโครงงาน</h3>
                <p class="text-sm text-gray-500 dark:text-slate-400">แอดมินกำลังดำเนินการจัดหาวันเวลาและสถานที่สอบที่เหมาะสมให้คุณครับ</p>
              </div>
              <div class="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-auto">
                <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                อยู่ระหว่างจัดตารางสอบ
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-indigo-600 shadow-sm flex items-center justify-center text-2xl shrink-0">
                  <span class="material-symbols-rounded">title</span>
                </div>
                <div class="flex-grow">
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ชื่อโครงงาน (ภาษาไทย)</div>
                  <div class="text-base font-bold text-[#1a1a40] dark:text-white">{{ project?.titleTh }}</div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                  <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-blue-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                    <span class="material-symbols-rounded">person_pin</span>
                  </div>
                  <div>
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อาจารย์ที่ปรึกษาหลัก</div>
                    <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ project?.advisor?.fullname || '-' }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                  <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                    <span class="material-symbols-rounded">group</span>
                  </div>
                  <div>
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อาจารย์ที่ปรึกษาร่วม</div>
                    <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ project?.coAdvisor?.fullname || '-' }}</div>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-amber-500 shadow-sm flex items-center justify-center text-2xl shrink-0">
                  <span class="material-symbols-rounded">hourglass_empty</span>
                </div>
                <div class="flex-grow">
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ข้อมูลการยื่นคำร้อง</div>
                  <div class="text-sm font-bold text-[#1a1a40] dark:text-white">คุณได้ยื่นคำร้องเรียบร้อยแล้ว รอการจัดตารางสอบ</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Initial Submission State -->
          <div v-else class="text-center py-10">
            <div
              class="w-28 h-28 bg-blue-50 text-blue-600 rounded-[35px] flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <span class="material-symbols-rounded text-5xl">grading</span>
            </div>
            <h3 class="text-[#1a1a40] dark:text-white mb-4 text-xl md:text-2xl font-bold">ยื่นคำร้องขอสอบจบโครงงาน</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-[500px] mx-auto mb-6 text-lg leading-relaxed">
              หากคุณดำเนินงานโครงงานและจัดทำรูปเล่มฉบับร่างเสร็จสมบูรณ์แล้ว
              กรุณาเข้าไปยืนยันการส่งเอกสาร CP2 และ CP3 ให้ครบถ้วนก่อนยื่นคำร้องขอสอบจบครับ
            </p>

            <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <div :class="hasCp2 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'" class="px-6 py-3 rounded-2xl border flex items-center gap-3 shadow-sm transition-all duration-300">
                <span class="material-symbols-rounded">{{ hasCp2 ? 'check_circle' : 'cancel' }}</span>
                <span class="font-bold text-sm">การส่งเอกสารขอสอบ (CP2)</span>
              </div>
            </div>

            <button @click="handleNotifyReadiness" :disabled="submitting || !hasCp2"
              class="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-blue-200 dark:shadow-none hover:-translate-y-1 active:scale-95 disabled:opacity-50 group disabled:hover:-translate-y-0 disabled:active:scale-100">
              <span class="material-symbols-rounded text-2xl" v-if="!submitting">check_circle</span>
              <span>{{ submitting ? 'กำลังประมวลผล...' : 'ยืนยันความพร้อมและยื่นคำร้อง' }}</span>
              <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform"
                v-if="!submitting">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:gap-3 print:hidden mb-6 mt-8 w-full max-w-[210mm] mx-auto" :class="hasCp2 ? 'hidden' : ''">
        <button v-if="!isAdmin && !hasCp2" @click="clearDraft" class="bg-rose-50 text-rose-600 border border-rose-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-rose-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
          <span class="material-symbols-rounded text-base">delete_sweep</span> ล้างฉบับร่าง
        </button>
        <button v-if="!isAdmin && !hasCp2" @click="saveDraft" class="bg-blue-50 text-blue-600 border border-blue-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
          <span class="material-symbols-rounded">save</span> บันทึกข้อมูล
        </button>
        <button @click="printDocument" class="bg-[#1a1a40] text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-[#2a2a5c] transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
          <span class="material-symbols-rounded">print</span> พิมพ์เอกสาร (CP2)
        </button>
        <button v-if="!isAdmin && !hasCp2" @click="submitDocument" class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-emerald-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
          <span class="material-symbols-rounded">send</span> ยืนยันส่งให้แอดมิน
        </button>
      </div>

      <div class="flex flex-col items-center gap-8 print:block print:w-full print:gap-0" :class="hasCp2 ? 'pointer-events-none' : ''">
        <div class="paper-a4 page-break bg-white dark:bg-slate-800 shadow-lg relative text-black dark:text-slate-100 text-[16px] leading-relaxed print:shadow-none">
            
            <div class="text-center mb-6">
              <img src="/bsru_logo.jpg" alt="BSRU Logo" class="w-[80px] mx-auto mb-2 print:w-[70px]">
              <h2 class="font-bold text-[18px]">แบบสอบโครงงานคอมพิวเตอร์</h2>
              <h3 class="font-bold text-[16px]">สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี</h3>
              <h3 class="font-bold text-[16px]">มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา</h3>
            </div>

            <div class="flex items-end justify-end mb-5 gap-2 w-full">
              <span class="shrink-0">ภาคเรียนที่</span>
              <input type="text" v-model="form.semester" class="form-dotted text-center w-12 min-w-0">
              <span class="shrink-0 ml-2">ปีการศึกษา</span>
              <input type="text" v-model="form.academicYear" class="form-dotted text-center w-20 min-w-0">
            </div>

            <div class="mb-6">
              <div class="flex items-end gap-2 w-full mb-3">
                <span class="font-bold shrink-0">ชื่อเรื่อง (ภาษาไทย)</span>
                <input type="text" v-model="form.projectTitleTh" class="form-dotted flex-1 min-w-0">
              </div>
              <div class="flex items-end gap-2 w-full">
                <input type="text" v-model="form.projectTitleTh2" class="form-dotted flex-1 min-w-0">
              </div>
            </div>

            <div class="mb-5">
              <div class="font-bold text-center mb-2">คนที่ 1</div>
              <div class="flex items-end mb-2 gap-2 w-full">
                <span class="shrink-0">ชื่อนักศึกษา (นาย/นาง/นางสาว)</span>
                <input type="text" v-model="s1.name" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">รหัสนักศึกษา</span>
                <input type="text" v-model="s1.studentId" class="form-dotted w-40 min-w-0 text-center">
              </div>
              <div class="flex items-end gap-2 w-full">
                <span class="shrink-0">โทรศัพท์มือถือ</span>
                <input type="text" v-model="s1.phone" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">E-mail</span>
                <input type="email" v-model="s1.email" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">Line Id</span>
                <input type="text" v-model="s1.lineId" class="form-dotted flex-1 min-w-0 text-center">
              </div>
            </div>

            <div class="mb-8">
              <div class="font-bold text-center mb-2">คนที่ 2</div>
              <div class="flex items-end mb-2 gap-2 w-full">
                <span class="shrink-0">ชื่อนักศึกษา (นาย/นาง/นางสาว)</span>
                <input type="text" v-model="s2.name" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">รหัสนักศึกษา</span>
                <input type="text" v-model="s2.studentId" class="form-dotted w-40 min-w-0 text-center">
              </div>
              <div class="flex items-end gap-2 w-full">
                <span class="shrink-0">โทรศัพท์มือถือ</span>
                <input type="text" v-model="s2.phone" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">E-mail</span>
                <input type="email" v-model="s2.email" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">Line Id</span>
                <input type="text" v-model="s2.lineId" class="form-dotted flex-1 min-w-0 text-center">
              </div>
            </div>

            <div class="flex justify-between px-8 mb-8 mt-6 w-full break-inside-avoid">
              <div class="flex flex-col items-center min-w-[250px]">
                <div class="flex items-end gap-2 w-full mb-1">
                  <span class="shrink-0">ลงชื่อ</span>
                  <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                  <span class="shrink-0">นักศึกษา</span>
                </div>
                <div class="flex items-end gap-1 w-full justify-center">
                  <span class="shrink-0">(</span>
                  <span class="form-dotted min-w-[150px] px-2 text-center text-gray-700 dark:text-slate-300">{{ s1.name }}</span>
                  <span class="shrink-0">)</span>
                </div>
              </div>
              
              <div class="flex flex-col items-center min-w-[250px]">
                <div class="flex items-end gap-2 w-full mb-1">
                  <span class="shrink-0">ลงชื่อ</span>
                  <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                  <span class="shrink-0">นักศึกษา</span>
                </div>
                <div class="flex items-end gap-1 w-full justify-center">
                  <span class="shrink-0">(</span>
                  <span class="form-dotted min-w-[150px] px-2 text-center text-gray-700 dark:text-slate-300">{{ s2.name }}</span>
                  <span class="shrink-0">)</span>
                </div>
              </div>
            </div>

            <div class="border-[1.5px] border-black relative mt-10 break-inside-avoid">
              
              <div class="absolute top-0 right-0 border-l-[1.5px] border-b-[1.5px] border-black px-6 py-1 bg-white dark:bg-slate-800 text-center text-[14px] font-bold">
                สำหรับอาจารย์ที่ปรึกษา
              </div>
              
              <div class="p-6 pt-10">
                <div class="mb-5 font-bold text-[16px]">ความเห็นอาจารย์ที่ปรึกษาโครงงานคอมพิวเตอร์</div>
                
                <div class="flex justify-between items-start px-2">
                  <div class="flex flex-col gap-3 pt-2">
                    <div class="flex items-center gap-3">
                      <span class="shrink-0">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span> 
                      <span class="shrink-0">อนุมัติให้สอบได้</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="shrink-0">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span> 
                      <span class="shrink-0">ไม่อนุมัติให้สอบ</span>
                    </div>
                  </div>

                  <div class="flex flex-col items-center min-w-[350px]">
                    <div class="flex items-end gap-2 w-full mb-2">
                      <span class="shrink-0">ลงชื่อ</span>
                      <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                      <span class="shrink-0">อาจารย์ที่ปรึกษาหลัก</span>
                    </div>
                    
                    <div class="flex items-end gap-1 w-full justify-center mb-6">
                      <span class="shrink-0">(</span>
                      <span class="form-dotted min-w-[220px] px-2 text-center text-gray-600 dark:text-slate-400">{{ form.advisorName }}</span>
                      <span class="shrink-0">)</span>
                    </div>

                    <div class="flex justify-center items-end gap-2 w-full">
                      <span class="shrink-0">วันที่</span>
                      <input type="text" value="      /        /      " class="form-dotted w-[150px] min-w-0 text-center text-gray-400" readonly>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
      </div>

      <!-- Activity Section -->
      <!-- <ActivityTimeline v-if="project?.id" :project-id="project.id" /> -->

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watchEffect } from 'vue'

definePageMeta({ layout: 'student' })

const userCookie = useCookie('user_session')
const user = userCookie.value
const submitting = ref(false)
const isAdmin = computed(() => user?.role === 'admin' || user?.role === 'teacher')

const { data: projectData, refresh } = await useFetch('/api/student/my-project')
const project = computed(() => projectData.value?.project)

// Find the latest final exam schedule (CP2 type)
const finalExam = computed(() => {
  if (!project.value?.exams) return null
  // Return the pending one first, or the latest one
  return project.value.exams.find(e => e.type === 'CP2' && e.status === 'pending') ||
    project.value.exams.find(e => e.type === 'CP2')
})

const hasCp2 = computed(() => project.value?.reports?.some(r => r.reportType === 'cp2'))
const hasCp3 = computed(() => project.value?.reports?.some(r => r.reportType === 'cp3'))

const { success: alertSuccess, error: alertError, confirm: alertConfirm } = useAlerts()

const form = reactive({
  semester: '',
  academicYear: '',
  projectTitleTh: '',
  projectTitleTh2: '',
  advisorName: ''
})

const s1 = reactive({
  name: '', 
  studentId: '',
  phone: '', 
  email: '',
  lineId: ''
})

const s2 = reactive({
  name: '', 
  studentId: '',
  phone: '', 
  email: '',
  lineId: ''
})

watchEffect(() => {
  if (project.value) {
    form.semester = project.value.semester || ''
    form.academicYear = project.value.academicYear || ''
    form.projectTitleTh = project.value.titleTh || ''
    form.advisorName = project.value.advisor?.fullname || ''

    if (project.value.student1) {
      s1.name = project.value.student1.fullname || ''
      s1.studentId = project.value.student1.username || ''
      s1.phone = project.value.student1.tel || ''
      s1.email = project.value.student1.email || ''
      s1.lineId = project.value.student1.lineId || ''
    }

    if (project.value.student2) {
      s2.name = project.value.student2.fullname || ''
      s2.studentId = project.value.student2.username || ''
      s2.phone = project.value.student2.tel || ''
      s2.email = project.value.student2.email || ''
      s2.lineId = project.value.student2.lineId || ''
    }
    
    if (import.meta.client && !hasCp2.value) {
      const saved = localStorage.getItem('cp2_draft')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          if (!form.semester && data.form?.semester) form.semester = data.form.semester
          if (!form.academicYear && data.form?.academicYear) form.academicYear = data.form.academicYear
          if (!form.projectTitleTh && data.form?.projectTitleTh) form.projectTitleTh = data.form.projectTitleTh
        } catch (e) {
          console.error('Failed to merge draft:', e)
        }
      }
    }
  }
})

const printDocument = () => {
  window.print()
}

const clearDraft = async () => {
  const result = await alertConfirm('ล้างข้อมูลฉบับร่าง', 'คุณต้องการล้างข้อมูลที่บันทึกไว้ในเครื่องนี้ใช่หรือไม่? (ข้อมูลในฐานข้อมูลจะไม่ถูกลบ)')
  if (result.isConfirmed) {
    localStorage.removeItem('cp2_draft')
    window.location.reload()
  }
}

const submitDocument = async () => {
  const result = await alertConfirm('ยืนยันการส่งเอกสาร', 'คุณต้องการยืนยันการส่งเอกสาร CP2 ให้แอดมินใช่หรือไม่?')
  if (result.isConfirmed) {
    submitting.value = true
    try {
      const response = await $fetch('/api/student/submit-cp-document', {
        method: 'POST',
        body: { projectId: project.value?.id, type: 'cp2' }
      })
      if (response.success) {
        alertSuccess('สำเร็จ', 'ยืนยันการส่งเอกสารเรียบร้อยแล้ว')
        refresh()
      }
    } catch (error) {
      alertError('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการส่งเอกสาร')
    } finally {
      submitting.value = false
    }
  }
}

const saveDraft = async () => {
  submitting.value = true
  try {
    const response = await $fetch('/api/student/save-cp-data', {
      method: 'POST',
      body: {
        projectId: project.value?.id,
        titleTh: form.projectTitleTh,
        semester: form.semester,
        academicYear: form.academicYear,
        student1: s1,
        student2: s2.studentId ? s2 : null
      }
    })

    if (response.success) {
      const draftData = { form, s1, s2 }
      localStorage.setItem('cp2_draft', JSON.stringify(draftData))
      alertSuccess('บันทึกสำเร็จ', 'บันทึกข้อมูลลงระบบเรียบร้อยแล้ว อาจารย์สามารถเห็นการเปลี่ยนแปลงได้ทันที')
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'ไม่สามารถบันทึกข้อมูลลงเซิร์ฟเวอร์ได้ แต่บันทึกในเครื่องแล้ว')
    const draftData = { form, s1, s2 }
    localStorage.setItem('cp2_draft', JSON.stringify(draftData))
  } finally {
    submitting.value = false
  }
}

const handleNotifyReadiness = async () => {
  if (!project.value) return
  submitting.value = true
  try {
    const res = await $fetch('/api/student/request-exam', {
      method: 'POST',
      body: {
        projectId: project.value.id
      }
    })
    if (res.success) {
      alertSuccess('สำเร็จ', 'ส่งคำร้องขอสอบจบเรียบร้อยแล้ว! กรุณารอแอดมินแจ้งวันเวลาสอบครับ')
      refresh()
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาด')
  } finally {
    submitting.value = false
  }
}

const getProjectStepStatus = () => {
  if (!project.value) return 'ยังไม่ได้เริ่ม'
  if (project.value.step >= 5) return 'รอส่งเล่มสมบูรณ์'
  if (project.value.step === 4) return 'ยื่นคำร้องสอบจบแล้ว'
  return 'อยู่ระหว่างทำรูปเล่ม'
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.material-symbols-rounded {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>

<style scoped>
/* ================= CSS สำหรับฟอร์ม (หน้าจอ) ================= */
.paper-a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 15mm 20mm; 
  box-sizing: border-box;
  margin: 0 auto;
}

.dark .form-dotted {
  color: #f1f5f9 !important;
  border-bottom-color: #94a3b8 !important;
}

.form-dotted {
  border: none;
  border-bottom: 1.5px dotted #000;
  background-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
  font-family: 'Sarabun', sans-serif;
  color: #1a1a40;
  border-radius: 0;
  line-height: 1.2;
  padding-bottom: 2px;
}

/* ================= CSS สำหรับสั่ง Print ================= */
@media print {
  @page {
    size: A4 portrait;
    margin: 0cm;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .paper-a4 {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 15mm 20mm !important; 
    border: none !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    overflow: hidden !important; 
    page-break-after: avoid !important; 
  }

  .break-inside-avoid {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .print\:hidden {
    display: none !important;
  }

  .form-dotted {
    border-bottom: 1px dotted #000 !important;
    color: #000 !important;
  }
  
  .form-dotted::placeholder {
    color: transparent !important; 
  }
}
</style>
