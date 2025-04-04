'use client';

import cn from 'classnames';
import { motion } from 'framer-motion';
import { Scissors, UserRoundPlus } from 'lucide-react';
import Image from 'next/image';

import { Link } from '@/i18n/navigation.public';
import ShoesIcon from '@/shared/components/SVG/ShoesIcon';
import { dayjsUTC } from '@/shared/lib/dayjs-config';

import { PassAndGymData } from '../types/complete.type';

interface CompleteClientProps {
  gym: string;
  pass: PassAndGymData;
}

const labels = {
  ko: {
    name: '성명',
    phoneNumber: '전화번호',
    date: '신청일자',
    type: '패스유형',
    shoesRental: '암벽화 대여',
    passType: {
      DayPass: '일일이용',
      DayExperience: '일일체험',
    },
    title: '일일 입장권',
    description: '카운터 직원에게 이 화면을 보여주세요.',
    addPass: '한명 더 등록할게요',
  },
  en: {
    name: 'Name',
    phoneNumber: 'Phone',
    date: 'Visit Date',
    type: 'Pass Type',
    shoesRental: 'Shoes Rental',
    passType: {
      DayPass: 'Day Pass',
      DayExperience: 'Day Experience',
    },
    title: 'One-day Pass',
    description: 'Show this screen to staff.',
    addPass: 'Add Pass',
  },
} as const;

export function CompleteClient({ gym, pass }: CompleteClientProps) {
  const label = labels[pass.locale];
  const isKo = pass.locale === 'ko';
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute right-4 top-4 z-50"
      >
        <Link
          href={`/gyms/${gym}/pass`}
          replace
          className="flex items-center gap-1 rounded-md bg-main px-3 py-2 text-sm text-white transition-transform duration-150 ease-in-out active:scale-95"
        >
          <UserRoundPlus size={14} />
          {label.addPass}
        </Link>
      </motion.div>
      <motion.div
        className="max-w-[320px] overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-xl"
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02, rotate: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col bg-gradient-to-b from-blue-300 to-blue-200 to-30% p-4 text-black">
          <div className="my-6 flex flex-col items-center">
            <motion.img
              src="/images/complete.png"
              alt="complete"
              width={90}
              height={90}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="mx-auto mb-4 h-1 w-16 rounded bg-gradient-to-r from-blue-400 to-blue-500" />
            <motion.h4
              className="text-center tracking-tight text-gray-500"
              initial={{ x: 0, opacity: 0, scale: 0.95 }}
              animate={{
                x: [0, -4, 4, -4, 4, -2, 2, 0],
                rotate: [0, -1, 1, -1, 1, 0],
                color: ['#6b7280', '#3b82f6', '#6b7280'],
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: 'easeInOut',
              }}
            >
              {label.description}
            </motion.h4>
          </div>
          <div className="flex gap-1">
            <div className="flex items-center">
              <div className={cn('relative aspect-video h-8 w-full transition-all duration-300 ease-in-out')}>
                <Image
                  key="pass-logo"
                  priority
                  loading="eager"
                  src={pass.gym.logo}
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={cn('text-sm font-bold', isKo ? 'tracking-normal' : 'tracking-tighter')}>
                {pass.gym.name}
              </h1>
              <p className={cn('text-[11px] text-gray-600', isKo ? 'tracking-normal' : 'tracking-tighter')}>
                {pass.gym.location}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-slate-600 to-slate-800 px-4 py-2 text-center text-white">
          <h2 className="font-bold">{label.title}</h2>
        </div>
        <div className="relative bg-gray-100 py-1">
          <div className="absolute left-0 w-full border-t-2 border-dashed border-gray-300"></div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2">
            <Scissors className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="grid gap-6 rounded-xl bg-white p-6 shadow-md [grid-template-columns:3fr_2fr]">
          <div className="space-y-4 border-r pr-6">
            <div>
              <div className="text-[10px] text-gray-500">{label.type}</div>
              <div
                className={cn(
                  'font-semibold text-gray-900',
                  isKo ? 'text-lg tracking-tight' : 'text-base tracking-tighter',
                )}
              >
                {label.passType[pass.type]}
              </div>
            </div>
            {pass.shoesRental && (
              <div className="space-y-1">
                <div className="text-[10px] text-gray-500">{label.shoesRental}</div>
                <span className="relative inline-flex items-center justify-center rounded-full bg-blue-100 p-1 shadow-sm">
                  <ShoesIcon className="h-6 w-6 text-blue-600" />
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-[10px] text-gray-500">{label.name}</div>
              <div className="text-sm font-medium text-gray-800">{pass.name}</div>
            </div>
            {pass.phoneNumber && (
              <div>
                <div className="text-[10px] text-gray-500">{label.phoneNumber}</div>
                <div className="text-sm font-medium text-gray-800">{pass.phoneNumber}</div>
              </div>
            )}
            <div>
              <div className="text-[10px] text-gray-500">{label.date}</div>
              <div className="text-sm font-medium text-gray-800">{dayjsUTC(pass.createdAt).format('YYYY.MM.DD')}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
